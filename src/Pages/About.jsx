import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 mt-16 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-primary">About Our Blog Platform</h1>

      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Welcome to <strong>Your Blog Name</strong> — a vibrant community-driven platform where you
        can both <strong>read inspiring blog posts</strong> and <strong>share your own stories</strong>.
        Whether you're a passionate writer or an avid reader, our platform is designed to bring
        people together through engaging content and meaningful conversations.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">Write Your Story</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Anyone can create and publish their own blog posts with our easy-to-use editor. Share your
        knowledge, ideas, or experiences with a growing audience eager to discover fresh voices.
        Our simple signup process ensures you can start posting in minutes.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">Discover Great Content</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Explore a wide range of topics from technology, lifestyle, culture, and more. Stay updated
        with the latest trends, tutorials, and personal stories written by our community members.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">Community & Interaction</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Our platform fosters connection through comments, sharing, and following your favorite
        writers. Join discussions, give feedback, and grow together with like-minded people.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-secondary">Get Started</h2>
      <p className="text-gray-700 mb-8 leading-relaxed">
        Sign up today to start publishing your blog or to dive into a world of diverse perspectives and stories.
      </p>

      <div className="text-center">
        <a
          href="/signup"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
        >
          Join Now
        </a>
      </div>
    </div>
  );
}

export default About;
