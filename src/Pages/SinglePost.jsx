import React from 'react'
import img from '../assets/travel.jpg'
import { useParams } from 'react-router-dom'

function SinglePost() {
    const { postId } = useParams();
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const blog = posts.find((p) => p.postId === postId) || {};

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Side: Blog Content */}
                <div className="lg:col-span-2">
                    <img src={img} alt="Blog" className="rounded-lg w-full h-64 object-cover mb-6" />
                    <h1 className="text-3xl font-bold mb-2">{blog.heading}</h1>
                    <p className="text-sm text-gray-500 mb-6">
                        By <span className="text-primary font-semibold">{blog.userName}</span> · {blog.date}
                    </p>
                    <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">{blog.content}</p>
                </div>

                {/* Right Side: More Blogs */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Related Blogs</h2>
                    <ul className="space-y-4">

                        <li key={blog.id} className="border-b pb-2">
                            <h3 className="text-md font-medium">{blog.title || 'Untitled'}</h3>
                            <p className="text-sm text-gray-500">{blog.date || 'Unknown Date'}</p>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default SinglePost
