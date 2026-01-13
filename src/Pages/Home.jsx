import React, { useEffect, useState, useContext } from "react";
import BlogItem from "../Components/BlogItem"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import vdo from '../assets/bg.mp4'
import { UserContext } from "../contexts/context";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";


function Home() {
    const navigate = useNavigate();
    const getStarted = () => {
        navigate("/blog");
    }

    const { user, userPosts, loading, users } = useContext(UserContext);


    //Fetch users from firebase
    const [writersData, setWritersData] = useState([]);

    // Fetch users from Firestore
    const getUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        setWritersData(users); // ✅ Store in state
        // console.log(users);
    };

    const goProfile = (id) => {
        navigate(`/profile/${id}`);
    }

    // Call getUsers when component mounts
    useEffect(() => {
        getUsers();
    }, []);
    //Fetch users from firebase
    return (
        <>
            <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src={vdo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay for darkness (optional) */}
                <div className="absolute top-0 left-0 w-full h-full bg-secondary opacity-40 z-10"></div>

                {/* Foreground content */}
                <div className="relative z-20 text-center text-white px-4">
                    <h2 className="text-3xl font-bold mb-4 uppercase">Discover something new today</h2>
                    <p className="text-lg text-gray-200 mb-6 max-w-3xl">
                        Explore our latest blogs, tutorials, and resources to enhance your knowledge and skills in web development, design, and more.
                    </p>
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition cursor-pointer" onClick={getStarted}>
                        Get Started
                    </button>
                </div>
            </section>

            <section className="container mx-auto mb-12">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-medium p-4">Top Blog</h3>
                    <Link to="/blog" className="text-primary pr-5">View All</Link>
                </div>
                <div className="flex flex-wrap">
                    {loading ? (
                        <p className="text-center mt-10 w-full">Loading blog posts...</p>
                    ) : !user || Object.keys(user).length === 0 ? (
                        <p className="text-center mt-10 w-full">
                            Please log in or sign up to view blog posts.
                        </p>
                    ) : userPosts.length > 0 ? (
                        userPosts.slice(0, 3).map((item) => (
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

            <section className="bg-gray-100 pt-12 pb-8">
                <div className="container mx-auto px-5 flex justify-between items-center">
                    <h3 className="text-2xl font-medium text-center">Meet Our Writers</h3>
                    <Link to="/our-writers" className="text-primary pr-5">View All Profile</Link>
                </div>
                <div className="container mx-auto my-12 px-4 flex flex-wrap justify-between">
                    {users.slice(0, 4).map(writer => {
                        return (
                            <div
                                key={writer.userId}
                                onClick={() => goProfile(writer.userId)}
                                className="bg-white min-w-48 mb-4 border-2 border-primary rounded-xl shadow-md p-4 text-center cursor-pointer">
                                <img src={writer.profilePic} alt={writer.name} className="rounded-full w-16 h-16 mx-auto mb-2 border-2 border-primary object-cover" />
                                <h4 className="text-lg font-semibold">{writer.name}</h4>
                                <p className="text-sm text-gray-600">
                                    {writer.bio.split(" ").slice(0, 4).join(" ")}{writer.bio.split(" ").length > 3 ? "..." : ""}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-medium text-center mb-8 text-gray-800">Sponsored By</h3>

                    <div className="flex flex-wrap justify-center items-center gap-50">
                        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://assets.vercel.com/image/upload/v1629993480/front/favicon/vercel/android-chrome-192x192.png"
                                alt="Vercel"
                                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
                            />
                        </a>

                        <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png"
                                alt="Firebase"
                                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
                            />
                        </a>

                        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://tailwindcss.com/favicons/favicon-32x32.png"
                                alt="Tailwind CSS"
                                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
                            />
                        </a>

                        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://reactjs.org/favicon.ico"
                                alt="React"
                                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
                            />
                        </a>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Interested in sponsoring? <a href="/contact" className="text-primary underline">Contact us</a>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Home
