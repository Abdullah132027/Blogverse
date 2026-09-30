import React, { useState, useContext } from 'react'
import BlogItem from '../Components/BlogItem'
import { UserContext } from "../contexts/Context";

function Blog() {
  const { user, userPosts, loading } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = userPosts.filter((post) =>
    post.heading.toLowerCase().includes(searchTerm.toLowerCase()) || post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="container mx-auto mb-12">
        <div className="flex justify-between items-center flex-col">
          <h3 className="text-2xl font-medium p-4 self-start">All Blog Posts</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or category"
            className="p-2 mx-10 w-full border border-gray-300 rounded" />
        </div>
        <div className="flex flex-wrap">
          {loading ? (
            <p className="text-center mt-10 w-full">Loading blog posts...</p>
          ) : !user || Object.keys(user).length === 0 ? (
            <p className="text-center mt-10 w-full">
              Please log in or sign up to view blog posts.
            </p>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((item) => (
              <BlogItem
                key={item.postId}
                postId={item.postId}
                category={item.category}
                title={item.heading}
                description={item.content}
                image={item.image}
                date={item.date}
                userName={item.userName}
              />
            ))
          ) : (
            <p className="text-center mt-10 w-full">No blog posts available.</p>
          )}
        </div >
      </section>
    </>
  )
}

export default Blog
