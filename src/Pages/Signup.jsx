import React, { useState } from 'react';

function Signup() {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [topic, setTopic] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [msgClr, setMsgClr] = useState('text-red-500');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get existing users
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Validation
        const isIdExists = existingUsers.some((user) => user.userId === userId);
        const isEmailExists = existingUsers.some((user) => user.email === email);

        if (isIdExists) {
            setError('User ID already exists.');
            return;
        }

        if (isEmailExists) {
            setError('Email already exists.');
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        // Save new user
        const newUser = {
            name,
            userId,
            email,
            password,
            topic,
            role,
        };

        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Reset form
        setName('');
        setUserId('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTopic('');
        setRole('');
        setMsgClr('text-green-500');
        setError('Account created successfully!');
        setTimeout(() => {
            setError('');
            setMsgClr('text-red-500');
        }, 3000);
    };

    return (
        <>
            <div className="max-w-md mx-auto my-10 p-6 rounded-lg shadow-md bg-bg/20 text-primary">
                <h2 className="text-2xl font-semibold mb-4 text-primary text-center">Sign Up</h2>
                {error && <p className={`${msgClr} text-sm mb-4 text-center`}>{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                        required
                    >
                        <option value="">Select Favorite Topic</option>
                        <option value="technology">Technology</option>
                        <option value="travel">Travel</option>
                        <option value="health">Health</option>
                        <option value="history">History</option>
                    </select>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="reader">Reader</option>
                        <option value="writer">Writer</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-primary text-bg w-full py-2 rounded-md hover:bg-opacity-90 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    );
}

export default Signup;
