import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User, LayoutDashboard, BookOpen } from "lucide-react";

export default function StudentTopbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/student/login");
    };

    return (
        <div className="backdrop-blur-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 flex justify-between items-center shadow-xl border-b border-blue-500/30 relative">
            <button
                onClick={() => navigate("/student/dashboard")}
                className="flex items-center gap-2 text-lg font-semibold hover:opacity-90 transition">
                <LayoutDashboard size={22} />
                Student Dashboard
            </button>

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition shadow-sm">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                        alt="profile"
                        className="w-9 h-9 rounded-full border-2 border-white/70 shadow-sm"
                    />
                    <ChevronDown size={18} />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-2xl rounded-xl w-52 py-2 z-50 border border-gray-200 animate-fadeIn">
                        <button
                            onClick={() => navigate("/student/profile")}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 w-full text-left transition">
                            <User size={18} /> View Profile
                        </button>

                        <button
                            onClick={() => navigate("/student/enrollments")}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 w-full text-left transition">
                            <BookOpen size={18} /> My Enrollments
                        </button>

                        <hr className="my-1 border-gray-300" />

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-red-100 w-full text-left text-red-600 transition">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
