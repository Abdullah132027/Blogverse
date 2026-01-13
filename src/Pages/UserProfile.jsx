import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../contexts/context';
import BlogItem from '../Components/BlogItem';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from "../firebase/firebase";
import { deleteUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

function UserProfile({ setLoggedStatus }) {
    const navigate = useNavigate();
    const { user, users, userPosts, loading, setLoading, setUser, setUserPosts } = useContext(UserContext);
    const { userId: paramUserId } = useParams(); // ✅ get userId from URL
    const [profileUser, setProfileUser] = useState(null);

    useEffect(() => {
        // Find user from context by parameter
        const foundUser = users.find(u => u.userId === paramUserId);
        setProfileUser(foundUser || null);

        // optional: wait for auth check
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                setUser({});
                setUserPosts([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [users, paramUserId]);

    const handleLogout = () => {
        signOut(auth);
        setUser({});
        setUserPosts([]);
        setLoggedStatus(false);
        navigate('/');
    };

    const handleDelete = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const confirmDelete = window.confirm(
            "⚠️ Are you sure you want to delete your account? This will remove all your posts permanently."
        );
        if (!confirmDelete) return;

        try {
            setLoading(true);

            // 1️⃣ Fetch and delete all posts created by this user
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("userId", "==", profileUser.userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const deletePromises = querySnapshot.docs.map((docSnap) =>
                    deleteDoc(doc(db, "posts", docSnap.id)) // use Firestore's real document ID
                );

                await Promise.all(deletePromises);
                console.log(`Deleted ${querySnapshot.size} posts for user ${currentUser.uid}`);
            }

            // 2️⃣ Delete user document
            const userDocRef = doc(db, "users", currentUser.uid);
            await deleteDoc(userDocRef);
            console.log("User document deleted from Firestore");

            // 3️⃣ Delete user account (Auth)
            await deleteUser(currentUser);
            console.log("User account deleted from Firebase Authentication");

            // 4️⃣ Cleanup and redirect
            setUser({});
            setUserPosts([]);
            setLoggedStatus(false);
            navigate('/');

        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Error deleting account: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = () => navigate('/create-post');

    if (loading || !profileUser) {
        return <p className="text-center mt-10">Loading user data...</p>;
    }

    // ✅ show buttons only if this profile belongs to the logged-in user
    const isOwner = paramUserId === user?.userId;

    // ✅ filter posts for this profile user
    const profilePosts = userPosts.filter((post) => post.userId === profileUser.userId);

    return (
        <div className="container mx-auto px-4 py-8 relative">
            {isOwner && (
                <div className="absolute right-8 top-12 flex flex-row-reverse">
                    <button onClick={handleDelete} className="text-white px-2 py-2 rounded hover:text-white/70 cursor-pointer" title='Delete Account'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-user-minus-icon">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="22" x2="16" y1="11" y2="11" />
                        </svg>
                    </button>

                    <button onClick={handleLogout} className="text-white px-2 py-2 rounded hover:text-white/70 cursor-pointer" title='Log out'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-log-out-icon">
                            <path d="m16 17 5-5-5-5" />
                            <path d="M21 12H9" />
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        </svg>
                    </button>

                    <button onClick={handleCreatePost} className="text-white px-2 py-2 rounded hover:text-white/70 cursor-pointer" title='Create New Post'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-file-plus2-icon">
                            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                            <path d="M3 15h6" />
                            <path d="M6 12v6" />
                        </svg>
                    </button>
                </div>
            )}

            {/* User Info */}
            <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
                <img
                    src={profileUser.profilePic}
                    alt={profileUser.name}
                    className="w-32 h-32 rounded-full border-4 border-primary shadow-md object-cover"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileUser.name || 'Anonymous'}</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">{profileUser.bio || ''}</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>User Id:</strong> {profileUser.userId}</p>
                        <p><strong>Country:</strong> {profileUser.country || 'Unknown'}</p>
                        <p><strong>Joined:</strong> {profileUser.joined || 'Unknown'}</p>
                    </div>
                </div>
            </div>

            {/* User Posts */}
            <h3 className="pl-4 text-xl font-semibold mb-6 text-gray-800 dark:text-primary">
                Blogs by {profileUser.name}
            </h3>

            <div className="flex flex-wrap">
                {profilePosts.length > 0 ? (
                    profilePosts.map((item) => (
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
                    <p className="text-gray-400">No posts found for this user.</p>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
