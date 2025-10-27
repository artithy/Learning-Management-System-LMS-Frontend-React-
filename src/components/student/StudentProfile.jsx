import React, { useEffect, useState } from "react";
import getAxios from '../../../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentProfile() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");

                const res = await getAxios().get("/student/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFormData(res.data.student);
                setStudent(res.data.student);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await getAxios().post('/student/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStudent(res.data.Student);
            setEditing(false);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!student) return <p className="text-center mt-10">No profile found</p>;

    return (
        <div className="min-h-screen bg-blue-50 py-10 mt-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <div className="mb-4">
                    <label className="font-semibold block mb-1">Name:</label>
                    {editing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 w-full"
                        />
                    ) : (
                        <p>{student.name}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="font-semibold block mb-1">Email:</label>
                    <p>{student.email}</p>
                </div>

                <div className="mb-4">
                    <label className="font-semibold block mb-1">Phone:</label>
                    {editing ? (
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 w-full"
                        />
                    ) : (
                        <p>{student.phone}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="font-semibold block mb-1">Address:</label>
                    {editing ? (
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 w-full"
                        />
                    ) : (
                        <p>{student.address}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="font-semibold block mb-1">Date of Birth:</label>
                    {editing ? (
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob || ''}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 w-full"
                        />
                    ) : (
                        <p>{student.dob}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="font-semibold block mb-1">Gender:</label>
                    {editing ? (
                        <select
                            name="gender"
                            value={formData.gender || ''}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 w-full"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <p>{student.gender}</p>
                    )}
                </div>

                <div className="mt-6 flex gap-3">
                    {editing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setEditing(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
