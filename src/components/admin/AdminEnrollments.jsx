import React, { useState, useEffect } from "react";
import getAxios from "../../../utils/axios";
import { toast } from "react-toastify";

export default function AdminEnrollments() {
    const [enrollments, setEnrollments] = useState([]);

    const fetchEnrollments = async () => {
        try {
            const res = await getAxios().get('/enrollments');

            if (res.data.enrollments) {
                setEnrollments(res.data.enrollments);
            } else {
                toast.error("No enrollments found");
            }

        } catch (error) {
            toast.error("Failed to fetch enrollments");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEnrollments();
    }, []);

    return (
        <div className="min-h-screen w-full p-4">
            <h2 className="text-2xl font-bold mb-4">All Enrollments</h2>
            <div className="overflow-x-auto border rounded-lg shadow">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 border">Id</th>
                            <th className="px-4 py-2 border">Student</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Course</th>
                            <th className="px-4 py-2 border">Amount</th>
                            <th className="px-4 py-2 border">Payment Status</th>
                            <th className="px-4 py-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enroll) => (
                            <tr key={enroll.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{enroll.id}</td>
                                <td className="px-4 py-2 border">{enroll.student?.name || "N/A"}</td>
                                <td className="px-4 py-2 border">{enroll.student?.email || "N/A"}</td>
                                <td className="px-4 py-2 border">{enroll.course?.title || "N/A"}</td>
                                <td className="px-4 py-2 border">{parseFloat(enroll.amount).toFixed(2)}</td>
                                <td className="px-4 py-2 border">{enroll.payment_status}</td>
                                <td className="px-4 py-2 border">{new Date(enroll.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
