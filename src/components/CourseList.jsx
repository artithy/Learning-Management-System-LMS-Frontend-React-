import React, { useEffect, useState } from 'react';
import getAxios from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

export default function CourseList() {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const res = await getAxios().get("/courses");
            console.log(res.data);
            setCourses(res.data || []); // ✅ fixed
        } catch (error) {
            console.log(error);
            toast.error("Failed to load Data");
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            const res = await getAxios().post(`/deleteCourses/${id}`); // ✅ fixed
            toast.success("Course deleted successfully");
            fetchCourses();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete course");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto mt-20">
            <h2 className="text-3xl font-bold tex-center mb-6 text-blue-700">Course List</h2>
            <ToastContainer position="top-right" autoClose={3000} />
            <table className="">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Thumbnail</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Instructor</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Discount Price</th>
                        <th className="px-4 py-2">Lessons</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Created</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {courses.map((course, index) => (
                        <tr key={course.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="px-4 py-2">
                                {course.image ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/${course.image}`}
                                        alt={course.title}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>


                            <td className="px-4 py-2">{course.title}</td>
                            <td className="px-4 py-2">{course.instructor_name}</td>
                            <td className="px-4 py-2">{course.category?.name}</td>
                            <td className="px-4 py-2">{course.price}</td>
                            <td className="px-4 py-2">{course.discount_price}</td>
                            <td className="px-4 py-2">{course.total_lessons}</td>
                            <td className="px-4 py-2">{course.duration}</td>
                            <td className="px-4 py-2">{moment(course.created_at).format("YYYY-MM-DD")}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
