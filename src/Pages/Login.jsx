import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({setLoggedStatus}) {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = users.find(
            (user) =>
                (user.userId === input || user.email === input) &&
                user.password === password
        );

        if (foundUser) {
            setError('');
            // ✅ Save user session or auth status
            localStorage.removeItem('loggedInUser');
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            navigate('/'); // Redirect to home or dashboard
            setLoggedStatus(true); // Update logged status
        } else {
            setError('Invalid username/email or password');
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
                        onChange={(e) => setInput(e.target.value)}
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
                    <button
                        type="submit"
                        className="bg-primary text-bg w-full py-2 rounded-md hover:bg-opacity-90 transition duration-300"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login
