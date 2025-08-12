import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Navbar({loggedStatus}) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const userProfile = () => {
        navigate('/profile'); // Assuming you have a profile route
    };

    return (
        <>
            <header className="bg-bg text-primary flex justify-center items-center p-5">
                <Link to="/"><img src={logo} alt="logo" className='w-60' /></Link>
            </header>
            <nav className="bg-secondary text-primary p-5 shadow-md">
                <div className="container mx-auto flex flex-wrap items-center justify-between gap-12 ">
                    {/* Search Bar */}
                    <div className="flex items-center space-x-1">
                        <input
                            type="text"
                            placeholder="Search Blog..."
                            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button className="bg-primary text-bg px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer hover:bg-primary/90">
                            Search
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex space-x-6 text-base font-medium flex-1 justify-center items-center">
                        <li><Link to="/" className="hover:text-accent transition duration-300 text-md hover:text-bg">Home</Link></li>
                        <li><Link to="/about" className="hover:text-accent transition duration-300 text-md hover:text-bg">About</Link></li>
                        <li><Link to="/blog" className="hover:text-accent transition duration-300 text-md hover:text-bg">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition duration-300 text-md hover:text-bg">Contact</Link></li>
                    </ul>

                    {/* Auth Buttons */}
                    {loggedStatus ? (<div className="flex justify-center items-center space-x-2 ml-auto min-w-40" onClick={userProfile}>
                        <img
                            src="https://i.pravatar.cc/150?img=5" // Placeholder avatar
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary cursor-pointer"
                        />
                    </div>
                    ) : (
                        <div className="flex items-center space-x-2 ml-auto">
                            <button className="bg-primary text-bg px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer hover:bg-primary/90" onClick={handleLogin}>
                                Login
                            </button>
                            <button className="bg-primary text-bg px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer hover:bg-primary/90" onClick={handleSignup}>
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </nav >
        </>
    )
}

export default Navbar
