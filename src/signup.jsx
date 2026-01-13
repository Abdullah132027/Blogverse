import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc, collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import imageCompression from "browser-image-compression";


function Signup() {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [country, setCountry] = useState("");
    const [profilePic, setProfilePic] = useState(null); // ✅ Profile pic
    const [error, setError] = useState("");
    const [msgClr, setMsgClr] = useState("text-red-500");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 650 * 1024) { // 650kb limit
                alert("Image size must be under 650KB in the developer version (unlimited in production).");
                setProfilePic(null);
                return;
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfilePic(reader.result); // Base64 image
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔎 Check if userId already exists
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            setError("User ID already exists.");
            return;
        }

        // 🔎 Check if email already exists
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setError("Email already exists.");
            return;
        }

        if (name.trim() === "" || userId.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "" || country.trim() === "" || bio.trim() === "") {
            setError("All fields are required.");
            return;
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Invalid email format.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        const joined = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        // const fakeMail = `${userId.toLocaleLowerCase()}@blogVerse.com`;

        const newUser = {
            name,
            userId,
            email,
            bio,
            country,
            joined,
            profilePic: profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`, // default avatar
        };


        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // auto-generated UID
            await setDoc(doc(db, "users", user.uid), newUser);
        } catch (error) {
            setError("Error creating user: " + error.message);
        }


        // Clear inputs
        setName("");
        setUserId("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBio("");
        setCountry("");
        setProfilePic(null);
        setMsgClr("text-green-500");
        setError("✅ Account created successfully!");
        setTimeout(() => {
            setError("");
            setMsgClr("text-red-500");
        }, 3000);
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 rounded-lg shadow-md bg-bg/20 text-primary">
            <h2 className="text-2xl font-semibold mb-4 text-primary text-center">
                Sign Up
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Pic Upload */}
                <label className="flex flex-col">
                    <span className="font-semibold mb-1">Profile Picture</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border p-2 rounded"
                    />
                    {profilePic && (
                        <img
                            src={profilePic}
                            alt="Profile Preview"
                            className="mt-2 w-20 h-20 object-cover rounded-full border"
                        />
                    )}
                </label>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    required
                />
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    required
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    required
                />
                <textarea
                    placeholder="Short Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    rows="3"
                    required
                ></textarea>
                {error && <p className={`${msgClr} text-sm mb-4 text-center`}>{error}</p>}
                <button
                    type="submit"
                    className="bg-primary text-bg w-full py-2 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Signup;
