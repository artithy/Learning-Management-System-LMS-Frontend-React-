import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

                <div className="flex items-center space-x-2">
                    <GraduationCap className="text-blue-500 w-7 h-7" />
                    <span className="text-xl font-semibold text-blue-500">
                        TT’s Education
                    </span>
                </div>

                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-700 font-medium">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-700 font-medium">
                        About
                    </Link>
                    <Link to="/courses" className="text-gray-700 hover:text-blue-700 font-medium">
                        Courses
                    </Link>
                </div>

                <div className="hidden md:flex space-x-4">
                    <Link
                        to="/student/login"
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                        Login
                    </Link>
                    <Link
                        to="/student/register"
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                        Signup
                    </Link>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden flex flex-col justify-center items-center space-y-1"
                >
                    <span className="block w-6 h-0.5 bg-gray-700"></span>
                    <span className="block w-6 h-0.5 bg-gray-700"></span>
                    <span className="block w-6 h-0.5 bg-gray-700"></span>
                </button>
            </div>

            {open && (
                <div className="md:hidden bg-white border-t shadow-md">
                    <div className="flex flex-col items-center py-4 space-y-3">
                        <Link to="/" className="text-gray-700 hover:text-blue-700">Home</Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-700">About</Link>
                        <Link to="/courses" className="text-gray-700 hover:text-blue-700">Courses</Link>
                        <Link to="/student/login" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Login</Link>
                        <Link to="/student/register" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Signup</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
