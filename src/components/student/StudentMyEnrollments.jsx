import React, { useState, useEffect } from 'react';
import getAxios from '../../../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentMyEnrollment() {
    const [enrollments, setEnrollments] = useState([]);

    const fetchEnrollments = async () => {
        try {
            const res = await getAxios().get('/student/enrollments');

            setEnrollments(res.data.enrollments || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch enrollments");
        }
    }

    useEffect(() => {
        fetchEnrollments();
    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="text-2xl font-semibold mb-6">
                    My Enrollments
                </div>

                {
                    (enrollments || []).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {enrollments.map((enroll) => (
                                <div key={enroll.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${enroll.course?.image || 'fallback.jpg'}`}
                                        className="w-full h-48 object-cover"
                                        alt={enroll.course?.title || "Course Image"}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{enroll.course?.title || "No Title"}</h3>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Instructor: {enroll.course?.instructor_name || "Unknown"}
                                        </p>
                                        <p className="text-md font-bold">
                                            Price: ${enroll.course?.discount_price || enroll.course?.price || 0}
                                        </p>
                                        <p className="text-green-600 font-semibold mt-2">
                                            Payment Status: {enroll.payment_status || "Pending"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">You have not enrolled in any courses yet.</p>
                    )
                }

            </div>
        </>
    )
}
