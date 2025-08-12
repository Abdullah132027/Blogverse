import React from 'react'
import BlogItem from '../Components/BlogItem'

function Blog() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  return (
    <>
      <section className="container mx-auto mb-12">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-medium p-4">All Blog Posts</h3>
        </div>
        <div className="flex flex-wrap">
          {posts.map((item, index) => (
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
          ))}
        </div >
      </section>
    </>
  )
}

export default Blog
