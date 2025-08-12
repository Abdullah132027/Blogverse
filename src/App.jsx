import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BlogItem from './Components/BlogItem'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import UserProfile from './Pages/UserProfile'
import Writers from './Pages/Writers'
import SinglePost from './Pages/SinglePost'
import CreatePost from './Pages/CreatePost'

function App() {
  const [loggedStatus, setLoggedStatus] = useState(false);

  // 👇 This effect runs once on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedStatus(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar loggedStatus={loggedStatus} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setLoggedStatus={setLoggedStatus} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/our-writers" element={<Writers />} />
          <Route path="/singlePost/:postId" element={<SinglePost />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
