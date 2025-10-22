import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAxios from "../../../utils/axios";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const res = await getAxios().post("/admin/login", form);
            toast.success("Login successful!");
            localStorage.setItem("token", res.data.token);
            setTimeout(() => navigate("/admin/dashboard"), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-blue-200 focus:border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-5 text-gray-700 text-center">
                    Don’t have an account?{" "}
                    <Link
                        to="/admin/register"
                        className="text-blue-700 hover:underline font-medium"
                    >
                        Signup
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </section>
    );
}
