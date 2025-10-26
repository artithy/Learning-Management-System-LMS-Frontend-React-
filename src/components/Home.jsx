import React from "react";
import { Link } from "react-router-dom";
import CourseGrid from "./CourseGrid";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

import About from "./About";

export default function Home() {
    return (
        <div>

            <div className="bg-gray-300 text-center py-32">
                <h1 className="text-5xl md:text-5xl font-extrabold text-black-700 mb-6">
                    Start Your Learning Journey
                </h1>
                <p className="text-gray-600 text-lg md:text-lg mb-8 bold">
                    Explore a wide range of courses designed to help you achieve your goals
                </p>
                <Link to="/courses">
                    <button className="bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300">
                        Explore Courses
                    </button>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-left text-gray-800 mb-12">
                    Featured Courses
                </h2>
                <CourseGrid showCategories={false} />
            </div>

            <div className="py-16 flex justify-center">
                <div className="bg-blue-100 rounded-3xl shadow-2xl p-10 w-11/12 md:w-5/6 text-center">
                    <h2 className=" px-4 py-2  text-2xl font-bold text-black-700  mb-4">
                        TT's Education
                    </h2>

                    <p className="text-gray-700 text-md font-semibold mb-6 leading-relaxed">
                        TT's Education provides high-quality online courses that help learners achieve their goals. Our platform offers a wide variety of expertly designed lessons, allowing students to learn at their own pace. With interactive exercises, practical projects, and guidance from industry professionals, learners can confidently develop skills that are relevant in today's fast-paced world. Join thousands of students worldwide who are enhancing their knowledge and advancing their careers through TT's Education.
                    </p>


                    <Link to="/about">
                        <button className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition duration-300">
                            Learn More About Us
                        </button>
                    </Link>
                </div>
            </div>

            <footer className="bg-gray-700 text-white py-4 mt-12">
                <div className="max-w-7xl mx-auto px-2 flex flex-col md:flex-row justify-between items-center">

                    <p className="mb-2 text-sm">&copy; 2025 LearnOnline. All rights reserved.</p>

                    <div className="flex space-x-6">
                        <Facebook className="w-6 h-6 hover:text-gray-200 transition" />
                        <Twitter className="w-6 h-6 hover:text-gray-200 transition" />
                        <Linkedin className="w-6 h-6 hover:text-gray-200 transition" />
                        <Instagram className="w-6 h-6 hover:text-gray-200 transition" />
                    </div>

                </div>
            </footer>

        </div>
    );
}
