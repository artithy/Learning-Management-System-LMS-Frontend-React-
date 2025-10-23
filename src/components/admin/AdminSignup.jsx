import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import getAxios from '../../../utils/axios';

export default function AdminSignup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await getAxios().post("/admin/register", form);
            console.log(res.data);
            toast.success("Admin registered successfully");
            localStorage.setItem("token", res.data.token || res.data?.token);
            setTimeout(() => navigate("/admin/dashboard"), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Admin Signup
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
                        type="email"
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
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                        Signup
                    </button>
                </form>
                <p className="mt-5 text-gray-700 text-center">
                    Already Registered?{" "}
                    <Link to="/admin/login" className="text-blue-700 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </section>
    );
}
