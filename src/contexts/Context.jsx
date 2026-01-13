import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged, deleteUser } from "firebase/auth";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [users, setUsers] = useState([]);   // ✅ All writers
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                await fetchUserData(currentUser);
            } else {
                setUser({});
                setUserPosts([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Fetch current user data + posts
    const fetchUserData = async (currentUser) => {
        try {
            // Fetch current user document
            const userDocSnap = await getDoc(doc(db, "users", currentUser.uid));
            if (userDocSnap.exists()) {
                setUser(userDocSnap.data());
            }


            // ✅ Fetch posts ordered by creation date (newest first)
            const postsRef = collection(db, "posts");
            const q = query(postsRef, orderBy("createdAt", "desc"));

            // ✅ Fetch documents using the query
            const querySnapshot = await getDocs(q);

            const allPosts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setUserPosts(allPosts);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // ✅ Fetch all users (writers)
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const q = query(collection(db, "users"), orderBy("joined", "desc"));
                const snapshot = await getDocs(q);
                const usersData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchAllUsers();
    }, []);

    const handleDelete = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            try {
                await deleteUser(currentUser);
                console.log("User deleted successfully!");
                setUser({});
                setUserPosts([]);
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                userPosts,
                users,      // ✅ Provide all writers
                loading,
                setLoading,
                setUser,
                setUserPosts,
                handleDelete
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
