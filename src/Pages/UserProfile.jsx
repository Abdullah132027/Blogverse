import React from 'react';
import BlogItem from '../Components/BlogItem';
import { useNavigate } from 'react-router-dom';

const user = {
    name: 'Abdullah Sardar',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'MERN Stack Developer | Love to write about tech, web dev & history.',
    id: 'Abdullah24',
    location: 'Dhaka, Bangladesh',
    joined: 'August 2023',
};

// const userBlogs = [
//     {
//         id: 1,
//         title: 'Mastering Tailwind CSS v4: The Future of Styling',
//         description: 'Explore all the new features, utilities, and performance boosts in Tailwind CSS 4.0...',
//         image: 'https://source.unsplash.com/random/600x400?tailwind',
//         category: 'Web Development',
//         date: 'August 1, 2025',
//     },
//     {
//         id: 2,
//         title: 'React Hooks You Should Know in 2025',
//         description: 'A guide to the most useful and underused hooks in React that can simplify your life...',
//         image: 'https://source.unsplash.com/random/600x400?reactjs',
//         category: 'Web Development',
//         date: 'July 25, 2025',
//     },
//     {
//         id: 3,
//         title: 'React Hooks You Should Know in 2025',
//         description: 'A guide to the most useful and underused hooks in React that can simplify your life...',
//         image: 'https://source.unsplash.com/random/600x400?reactjs',
//         category: 'Web Development',
//         date: 'July 25, 2025',
//     },
//     {
//         id: 4,
//         title: 'React Hooks You Should Know in 2025',
//         description: 'A guide to the most useful and underused hooks in React that can simplify your life...',
//         image: 'https://source.unsplash.com/random/600x400?reactjs',
//         category: 'Web Development',
//         date: 'July 25, 2025',
//     },
//     {
//         id: 5,
//         title: 'React Hooks You Should Know in 2025',
//         description: 'A guide to the most useful and underused hooks in React that can simplify your life...',
//         image: 'https://source.unsplash.com/random/600x400?reactjs',
//         category: 'Web Development',
//         date: 'July 25, 2025',
//     },
//     // Add more blog data
// ];

function UserProfile() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const userBlogs = existingPosts.filter(post => post.userId === loggedInUser.userId);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/'); // Redirect to login page after logout
        window.location.reload(); // Reload the page to reflect the logout
    }

    const handleCreatePost = () => {
        navigate('/create-post'); // Redirect to create post page
    }

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="absolute right-8 top-12 flex flex-row-reverse">
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className=" text-white px-2 py-2 rounded hover:text-white/70 cursor-pointer"
                    title='Log out'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg>
                </button>
                {/* New Post  */}
                <button
                    onClick={handleCreatePost}
                    className="text-white px-2 py-2 rounded hover:text-white/70 cursor-pointer"
                    title='Create New Post'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-plus2-icon lucide-file-plus-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M3 15h6" /><path d="M6 12v6" /></svg>
                </button>
            </div>

            {/* User Document */}
            <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full border-4 border-primary shadow-md"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{loggedInUser.name || 'Anonymous'}</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">{loggedInUser.bio || 'No bio available'}</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>User Id:</strong> {loggedInUser.userId || 'Unknown'}</p>
                        <p><strong>Location:</strong> {loggedInUser.location || 'Unknown'}</p>
                        <p><strong>Joined:</strong> {loggedInUser.joined || 'Unknown'}</p>
                    </div>
                </div>
            </div>

            {/* User Blogs */}
            <h3 className="pl-4 text-xl font-semibold mb-6 text-gray-800 dark:text-primary">
                Blogs by {loggedInUser.name}
            </h3>
            <div className="flex flex-wrap">
                {userBlogs.map((blog) => (
                    <BlogItem
                        key={blog.postId}
                        postId={blog.postId}
                        category={blog.category}
                        title={blog.heading}
                        description={blog.content}
                        image={blog.image}
                        date={blog.date}
                        userName={blog.userName}
                    />
                ))}
            </div>
        </div>
    );
}

export default UserProfile;
