import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getAxios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    const fetchCourse = async () => {
        try {
            const res = await getAxios().get(`/courses/${id}`);
            setCourse(res.data);
        } catch (error) {
            toast.error("Failed to load course details");
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [id]);

    if (!course)
        return <p className="text-center mt-20 text-gray-500 text-lg">Loading course...</p>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="flex flex-col md:flex-row gap-12 bg-white p-10 rounded-3xl shadow-xl border border-gray-300">
                <div className="md:w-1/2 flex justify-center items-center">
                    {course.image ? (
                        <img
                            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${course.image}`}
                            alt={course.title}
                            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-2xl">
                            No Image
                        </div>
                    )}
                </div>


                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-5">{course.title}</h1>
                        <p className="text-gray-700 mb-2 font-semibold text-lg">
                            Instructor: {course.instructor_name}
                        </p>
                        <p className="text-gray-600 mb-2 text-lg">
                            Category: {course.category?.name || "N/A"}
                        </p>
                        <p className="text-2xl font-bold mb-5">
                            Price:{" "}
                            {course.discount_price ? (
                                <>
                                    <span className="text-red-600 line-through mr-3">${course.price}</span>
                                    <span className="text-green-600">${course.discount_price}</span>
                                </>
                            ) : (
                                <span className="text-gray-800">${course.price}</span>
                            )}
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Course Description: </h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-5">
                            {course.description || "No description available for this course."}
                        </p>

                        {course.duration && (
                            <p className="text-gray-700 text-lg mb-1">
                                <span className="font-semibold">Duration:</span> {course.duration}
                            </p>
                        )}
                        {course.total_lessons && (
                            <p className="text-gray-700 text-lg mb-1">
                                <span className="font-semibold">Total Lessons:</span> {course.total_lessons}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate("/student/login")}
                            className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition text-lg font-semibold"
                        >
                            Enroll Now
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-300 text-gray-800 px-8 py-3 rounded-lg shadow hover:bg-gray-400 transition text-lg font-semibold"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
