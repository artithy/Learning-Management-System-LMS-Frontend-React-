import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getAxios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CourseGrid({ showCategories = false }) {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const res = await getAxios().get("/courses/public");
            setCourses(res.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load courses");
        }
    };

    const fetchCategories = async () => {
        if (!showCategories) return;
        try {
            const res = await getAxios().get("/categories/public");
            if (Array.isArray(res.data)) {
                setCategories(res.data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load categories");
            setCategories([]);
        }
    };


    useEffect(() => {
        fetchCourses();
        fetchCategories();
    }, []);

    const filteredCourses = selectedCategory === "All" ? courses : courses.filter(c => c.category?.name === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 ">
            <ToastContainer position="top-right" autoClose={3000} />

            {showCategories && (
                <div className="flex space-x-2 overflow-x-auto mb-6 no-scrollbar">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm transition ${selectedCategory === "All" ? "bg-blue-700 text-white shadow-md" : "bg-white text-blue-700 border border-blue-700 hover:bg-blue-100"}`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm transition ${selectedCategory === cat.name ? "bg-blue-700 text-white shadow-md" : "bg-white text-blue-700 border border-blue-700 hover:bg-blue-100"}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredCourses.length > 0 ? filteredCourses.map(course => (
                    <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        {course.image ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${course.image}`}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                                No Image
                            </div>
                        )}

                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-1">Instructor: {course.instructor_name}</p>
                            <p className="text-sm text-gray-600 mb-1">Category: {course.category?.name}</p>
                            <p className="text-md font-bold mb-5">
                                Price: {course.discount_price ? (
                                    <>
                                        <span className="text-red-600 line-through mr-3">${course.price}</span>
                                        <span className="text-green-600">${course.discount_price}</span>
                                    </>
                                ) : (
                                    <span className="text-gray-800">${course.price}</span>
                                )}
                            </p>
                            <div className="mt-4 flex justify-between">
                                <Link to={`/course/${course.id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">View Details</Link>
                                <button onClick={() => navigate("/student/login")} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Enroll Now</button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="text-center col-span-4 text-gray-500 mt-10">No courses found for this category.</p>
                )}
            </div>
        </div>
    );
}
