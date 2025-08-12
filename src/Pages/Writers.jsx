import React from 'react'

function Writers() {
    const writersData = JSON.parse(localStorage.getItem('users')) || [];

    return (
        <>
            <div className="container mx-auto my-12 px-4 flex justify-between flex-wrap ">
                {writersData.map(writer => {
                    return (
                        <div key={writer.id} className="bg-white min-w-48 mb-4 border-2 border-primary rounded-xl shadow-md p-4 text-center">
                            <img src="https://i.pravatar.cc/150?img=5" alt={writer.name} className="rounded-full w-16 h-16 mx-auto mb-2 border-2 border-primary" />
                            <h4 className="text-lg font-semibold">{writer.name}</h4>
                            <p className="text-sm text-gray-600">{writer.userId}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Writers
