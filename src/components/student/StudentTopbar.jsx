import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function StudentTopbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/student/login");
    }

    return (
        <div className="bg-blue-600 text-white py-3 px-6 flex justify-between items-center shadow-lg relative">
            <h2 className="text-xl font-semibold">🎓 Student Dashboard</h2>

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-full transition"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                        alt="profile"
                        className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    {dropdownOpen ? <X size={18} /> : <Menu size={18} />}
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-xl rounded-lg w-48 py-2 z-50">
                        <button
                            onClick={() => navigate("/student/profile")}
                            className="block px-4 py-2 hover:bg-blue-100 w-full text-left"
                        >
                            View Profile
                        </button>

                        <button
                            onClick={() => navigate("/student/enrollments")}
                            className="block px-4 py-2 hover:bg-blue-100 w-full text-left"
                        >
                            My Enrollments
                        </button>

                        <hr className="my-1 border-gray-300" />

                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
