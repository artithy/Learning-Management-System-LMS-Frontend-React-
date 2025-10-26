// src/components/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import AboutPage from "../assests/AboutPage.jpg";

export default function About() {
    return (
        <div className="bg-gray-50 min-h-screen">

            <div className="bg-gradient-to-r from-blue-50 to-blue-200 py-20 px-10 md:flex md:items-center md:justify-between">
                <div className="md:w-[70%] md:pl-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                        TT's Education
                    </h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        TT's Education is a premier online learning platform dedicated to empowering learners worldwide.
                        Our mission is to provide accessible, high-quality courses that equip students with practical skills
                        and knowledge required in today’s competitive environment. Through interactive lessons, real-world
                        projects, and guidance from experienced instructors, students can confidently develop expertise in
                        various fields, from programming and web development to design and digital marketing. Join thousands
                        of learners who are advancing their careers and achieving their goals with TT's Education.
                    </p>
                </div>

                <div className="md:w-1/2 mt-10 md:mt-14 flex justify-start md:pr-5 md:ml-12">
                    <div className="w-[430px] h-[430px] bg-blue-100 rounded-xl shadow-xl overflow-hidden">
                        <img
                            src={AboutPage}
                            alt="TT's Education"
                            className="w-full h-full object-cover rounded-xl shadow-lg"
                        />
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                        To deliver accessible, engaging, and practical online courses that empower learners to achieve their dreams.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                        To be a global leader in online education, providing knowledge and skills that shape the future of learners worldwide.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-2">Our Values</h3>
                    <p className="text-gray-600">
                        Integrity, Excellence, Innovation, and Support in every learning experience we provide.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                    What We Offer
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-white rounded-xl shadow-lg text-center hover:scale-105 transition transform">
                        <h3 className="font-bold mb-2">Interactive Lessons</h3>
                        <p className="text-gray-600">Hands-on exercises for practical learning.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg text-center hover:scale-105 transition transform">
                        <h3 className="font-bold mb-2">Expert Instructors</h3>
                        <p className="text-gray-600">Learn from industry professionals.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg text-center hover:scale-105 transition transform">
                        <h3 className="font-bold mb-2">Flexible Learning</h3>
                        <p className="text-gray-600">Learn at your own pace, anytime, anywhere.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg text-center hover:scale-105 transition transform">
                        <h3 className="font-bold mb-2">Career Oriented Skills</h3>
                        <p className="text-gray-600">Focus on real-world skills that matter.</p>
                    </div>
                </div>
            </div>

            <div className="text-center py-16 bg-gradient-to-r from-blue-100 to-blue-200">
                <h3 className="text-2xl font-bold mb-6">
                    Ready to Start Your Learning Journey?
                </h3>
                <Link to="/courses">
                    <button className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition transform">
                        Explore Courses
                    </button>
                </Link>
            </div>

        </div>
    );
}
