import React, { useState } from 'react';

function NewPost() {
  const [image, setImage] = useState(null);
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 image data
      };
      reader.readAsDataURL(file); // Start reading file
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

    if (!heading.trim() || !content.trim()) {
      alert('Please fill in both the heading and blog content.');
      return;
    }

    const postId = `${loggedInUser.userId || 'guest'}_${existingPosts.length + 1}`;

    const date = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const posts = {
      userId: loggedInUser.userId || 'guest',
      userName: loggedInUser.name || 'Anonymous',
      postId,
      heading,
      content,
      image: image || 'https://placehold.co/400x200/png/?text=Blog+Verse',
      date,
    };

    existingPosts.push(posts);
    localStorage.setItem('posts', JSON.stringify(existingPosts));

    // Clear inputs
    setImage(null);
    setHeading('');
    setContent('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow my-10">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col">
          <span className="font-semibold mb-1">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
          {/* {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-3 w-48 h-auto border rounded"
            />
          )} */}
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
          className="bg-primary text-white py-3 rounded hover:bg-primary/90 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPost;
