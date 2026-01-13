import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login({ setLoggedStatus }) {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await setPersistence(auth, browserLocalPersistence); // 👈 choose persistence
            await signInWithEmailAndPassword(auth, input, password);
            setError("");
            setLoggedStatus(true);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <>
            <div className="max-w-md mx-auto my-10 p-6 rounded-lg shadow-md bg-bg/20 text-primary">
                <h2 className="text-2xl font-semibold mb-4 text-primary text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username or Email"
                        value={input}
                        onChange={(e) => setInput(e.target.value.trim())}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-primary text-bg w-full py-2 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login
