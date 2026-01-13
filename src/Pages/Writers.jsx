import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/context";
import { useNavigate } from "react-router-dom";

function Writers() {
    const { users, loading } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();


    // Filter users based on search term (name or userId)
    const filteredUsers = users.filter((writer) =>
        writer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        writer.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p className="text-center mt-10">Loading writers...</p>;
    }

    const goProfile = (id) => {
        navigate(`/profile/${id}`);
    }

    return (
        <>
            <div className="flex justify-between items-center flex-col container mx-auto">
                <h3 className="text-2xl font-medium p-4 pl-0 self-start">All Writers</h3>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Name or User Id"
                    className="p-2 mx-10 w-full border border-gray-300 rounded" />
            </div>
            <div className="container mx-auto my-12 px-4 flex flex-wrap gap-14">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((writer) => (
                        <div
                            key={writer.id}
                            className="bg-white min-w-48 mb-4 border-2 border-primary rounded-xl shadow-md p-4 text-center cursor-pointer"
                            onClick={() => goProfile(writer.userId)}
                        >
                            <img
                                src={writer.profilePic}
                                alt={writer.name}
                                className="rounded-full w-16 h-16 mx-auto mb-2 border-2 border-primary object-cover"
                            />
                            <h4 className="text-lg font-semibold">{writer.name}</h4>
                            <p className="text-xs text-gray-600">{writer.userId}</p>
                            <p className="text-sm text-gray-600">
                                {writer.bio.split(" ").slice(0, 4).join(" ")}{writer.bio.split(" ").length > 3 ? "..." : ""}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No writers found.</p>
                )}
            </div>
        </>
    );
}

export default Writers;
