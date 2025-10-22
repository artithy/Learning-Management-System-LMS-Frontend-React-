import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getAxios from '../../../utils/axios';

export default function StudentSignup() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        dob: "",
        gender: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.phone || !form.address || !form.dob) {
            toast.error("Please fill all the fields");
            return;
        }
        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const res = await getAxios().post('/student/register', form);
            toast.success("User registered successfully");
            localStorage.setItem("token", res.data.token);
            setTimeout(() => navigate(""), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            console.error(error);
        }
    }

    return (
        <>
            <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mt-20">

                    <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-8">
                        <img
                            src="https://img.freepik.com/free-vector/online-registration-concept-illustration_114360-7865.jpg"
                            alt="Signup Illustration"
                            className="w-3/4 rounded-2xl shadow-lg"
                        />
                    </div>

                    <div className="p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                            Student Signup
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />

                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />

                            <input
                                type="text"
                                name="address"
                                placeholder="Enter your Address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />

                            <input
                                type="date"
                                name="dob"
                                value={form.dob}
                                onChange={handleChange}
                                className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />

                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                                Signup
                            </button>
                        </form>

                        <p className="mt-5 text-gray-700 text-center">
                            Already Registered?{" "}
                            <Link to="/student/login" className="text-blue-700 hover:underline font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}
