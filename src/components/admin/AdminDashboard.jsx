import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddCourse from '../AddCourse';
import CourseList from '../CourseList';
import Category from '../Category';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        navigate("/admin/login");
        alert("Logout Successful");
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 bg-white shadow-md p-4 fixed h-full">
                <h2 className="text-xl font-bold text-blue-700 mb-6">Admin Panel</h2>
                <nav className="flex flex-col space-y-2">
                    <Link to="/admin" className="block hover:text-blue-600">Dashboard Home</Link>
                    <Link to="/admin/add-course" className="block hover:text-blue-600">Add Course</Link>
                    <Link to="/admin/course-list" className="block hover:text-blue-600">All Courses</Link>
                    <Link to="/admin/category" className="block hover:text-blue-600">Add Category</Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-6 w-full text-left text-red-600 hover:text-red-700 font-semibold"
                >
                    Logout
                </button>
            </aside>

            <div className="flex-1 ml-64 p-6">
                <Routes>
                    <Route index element={<h1 className="text-2xl font-bold">Welcome to Dashboard</h1>} />
                    <Route path="add-course" element={<AddCourse />} />
                    <Route path="course-list" element={<CourseList />} />
                    <Route path="category" element={<Category />} />
                </Routes>
            </div>
        </div>
    );
}
