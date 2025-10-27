import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAxios from "../../../utils/axios";

export default function StudentLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const res = await getAxios().post("/student/login", form);
            toast.success("Login successful!");
            localStorage.setItem("token", res.data.token);

            setTimeout(() => navigate("/student/dashboard"), 2000);

            console.log(res.data);

        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials");
            console.error(error);
        }
    };

    return (
        <>
            <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mt-20">

                    <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-8">
                        <img
                            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg"
                            alt="Student Login Illustration"
                            className="w-3/4 rounded-2xl shadow-lg"
                        />
                    </div>

                    <div className="p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                            Student Login
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                to="/student/register"
                                className="text-blue-700 hover:underline font-medium"
                            >
                                Signup
                            </Link>
                        </p>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}
