import React, { useState, useContext, useEffect } from 'react'
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../contexts/context'
import { Trash2, PencilLine, Heart } from 'lucide-react';

function SinglePost() {

    const [editMode, setEditMode] = useState(false);
    const [editHead, setEditHead] = useState("");
    const [editBody, setEditBody] = useState("");
    const [loading, setLoading] = useState(false)
    const [like, setLike] = useState(false)

    const { user, userPosts } = useContext(UserContext);
    const { postId } = useParams();
    const blog = userPosts.find((p) => p.postId === postId) || {};
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmation = confirm("Are you sure you want to delete this post permanently? This action cannot be undone.");
        if (confirmation) {

            // 1️⃣ Fetch and delete all posts created by this user
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("postId", "==", postId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Delete only the first matched document
                try {
                    const docSnap = querySnapshot.docs[0];
                    await deleteDoc(doc(db, "posts", docSnap.id));
                } catch (error) {
                    console.error("Error deleting account:", error);
                    alert("Error deleting account: " + error.message);
                }
            }

            navigate(`/profile/${user.userId}`);
        }
    }

    const submitEdit = async () => {
        if (!editHead.trim() || !editBody.trim()) {
            alert("Both fields are required");
            return;
        }

        setLoading(true)
        try {
            // 🔍 Find post by postId
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("postId", "==", postId));
            const querySnapshot = await getDocs(q);


            if (!querySnapshot.empty) {
                const postDoc = querySnapshot.docs[0]; // Get the first match
                const postRef = doc(db, "posts", postDoc.id);

                // ✏️ Update fields
                await updateDoc(postRef, {
                    heading: editHead,
                    content: editBody,
                });
            } else {
                alert("⚠️ Post not found!");
            }

            setLoading(false)
            setEditMode(false)
            navigate(`/singlePost/${postId}`);
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Error deleting account: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const goToProfile = () => {
        navigate(`/profile/${blog.userId}`);
    }


    const isOwner = blog?.userId === user?.userId;

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Side: Blog Content */}
                <div className="lg:col-span-2">
                    <img
                        src={blog.image}
                        alt="Blog"
                        className="rounded-lg w-full h-64 object-cover mb-6"
                    />

                    {/* Heading and Delete Button Row */}
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-bold">{blog.heading}</h1>

                        {isOwner ? (
                            <div className='flex gap-2'>
                                <p><span>20</span>Likes</p>
                                <button
                                    onClick={() => setEditMode(!editMode)}
                                    className="text-black p-2 rounded hover:text-black/70 cursor-pointer transition-all"
                                >
                                    <PencilLine />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="text-black p-2 rounded hover:text-black/70 cursor-pointer transition-all"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        ) : (<button
                            onClick={() => setLike(!like)}
                            className=' text-white p-2 rounded cursor-pointer'>
                            {like ? (
                                <span className='flex gap-2 items-center'>
                                    <Heart fill='red' stroke='red' />
                                </span>
                            ) : (
                                <span className='flex gap-2 items-center'>
                                    <Heart stroke='black' />
                                </span>
                            )}
                        </button>)}
                    </div>

                    {editMode ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
                            {/* Add your edit blog form here */}
                            <div className="">
                                <input
                                    type="text"
                                    value={editHead || blog.heading || ""}
                                    onChange={(e) => setEditHead(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mb-4"
                                    required
                                />
                                <textarea
                                    value={editBody || blog.content || ""}
                                    onChange={(e) => setEditBody(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mb-4"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={submitEdit}
                                    className="bg-primary text-white p-2 rounded cursor-pointer"
                                >
                                    {loading ? ("Changing...") : ("Save Changes")}
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="bg-primary text-white p-2 rounded cursor-pointer"
                                >Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm text-gray-500 mb-6">
                                By{" "}
                                <span
                                    onClick={goToProfile}
                                    className="text-primary font-semibold cursor-pointer"
                                >{blog.userName}</span> ·{" "}
                                {blog.date}
                            </p>

                            <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                                {blog.content}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Side: Related Blogs */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Related Blogs</h2>
                    <ul className="space-y-4">
                        <li key={blog.id} className="border-b pb-2">
                            <h3 className="text-md font-medium">{blog.title || "Untitled"}</h3>
                            <p className="text-sm text-gray-500">{blog.date || "Unknown Date"}</p>
                        </li>
                    </ul>
                </div>
            </div >

        </>
    )
}

export default SinglePost
