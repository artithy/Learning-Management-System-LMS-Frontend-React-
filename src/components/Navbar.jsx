import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

                <button
                    onClick={() => setOpen(!open)}
                    className="flex flex-col justify-center items-start space-y-1 p-2 ml-2">
                    <span className="block  w-6 h-0.5 bg-gray-700 rounded-full"></span>
                    <span className="block  w-6 h-0.5 bg-gray-700 rounded-full"></span>
                    <span className="block  w-6 h-0.5 bg-gray-700 rounded-full"></span>
                </button>




                <div className="space-x-4 flex mr-4">
                    <div className="space-x-4">
                        <Link
                            to="/student/register"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            Student Portal
                        </Link>

                        <Link
                            to="/admin/signup"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                            Admin Portal
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}