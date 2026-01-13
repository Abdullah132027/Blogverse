import React, { useState, useContext } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../contexts/context";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import toast, { Toaster } from "react-hot-toast";

function NewPost() {
  const { user } = useContext(UserContext); // get logged-in user
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const options = {
        maxSizeMB: 0.65, // ≈650KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // ✅ Safety check
      if (!compressedFile) {
        alert("Image compression failed. Please try another image.");
        setLoading(false);
        return;
      }

      // ✅ Size validation after compression
      if (compressedFile.size > 650 * 1024) {
        alert("Image size must be under 650KB in the developer version (unlimited in production).");
        setImage(null);
        setLoading(false);
        return;
      }

      // ✅ Convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(compressedFile);
      setLoading(false);
    } catch (error) {
      console.error("Image processing failed:", error);
      alert("Something went wrong while processing the image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading.trim() || !content.trim() || !category.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await addDoc(collection(db, "posts"), {
        userId: user?.userId || "guest",
        userName: user?.name || "Anonymous",
        postId: `${user?.userId || "guest"}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        heading,
        content,
        category: category || "General",
        image: image || user?.profilePic || `https://placehold.co/400x200/png?text=${user?.name || "Guest"}`,
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        createdAt: serverTimestamp(),
      });

      // Reset form
      setImage(null);
      setHeading("");
      setContent("");
      setCategory("");
      toast.success("Post created successfully!");

      navigate(`/profile/${user?.userId}`); // redirect after post
    } catch (err) {
      console.error(err);
      setError("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow my-10">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col">
          <span className="font-semibold mb-1">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
          {loading && <p className="text-sm text-gray-500 mt-2">Processing image...</p>}
          {image && !loading && (
            <img
              src={image}
              alt="Preview"
              className="mt-3 w-48 h-auto border rounded"
            />
          )}
        </label>

        <label className="flex flex-col">
          <span className="font-semibold mb-1">Category</span>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter blog category"
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold mb-1">Heading</span>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter blog heading"
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold mb-1">Full Blog Content</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            placeholder="Write your blog content here..."
            className="border p-2 rounded resize-y"
            required
          ></textarea>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white py-3 rounded hover:bg-primary/90 transition cursor-pointer"
        >
          {loading ? "Posting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default NewPost;
