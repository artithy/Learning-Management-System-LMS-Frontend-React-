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
        }


        try {
            const res = await getAxios().post('/student/register', form);
            toast.success(res.data.message);
            localStorage.setItem(
                "token", res.data.token
            );
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            console.error(error);
        }
    }



    return (
        <>
            <section className="">
                <div>

                </div>

                <div className="">
                    <div className="">
                        Student Signup
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            className=""
                        />

                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            className=""
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            className=""
                        />


                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter your Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className=""
                        />


                        <input
                            type="text"
                            name="address"
                            placeholder="Enter your Address"
                            value={form.address}
                            onChange={handleChange}
                            className=""
                        />

                        <input
                            type="date"
                            name="dob"
                            placeholder="Enter your Date of Birth"
                            value={form.dob}
                            onChange={handleChange}
                            className=""
                        />

                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className=""
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>

                        </select>

                        <button
                            type="submit"
                            className=""
                        >
                            Signup
                        </button>
                    </form>
                    <p className="">
                        Already Registered?
                        <Link to="/student/login" className="">
                            Login
                        </Link>
                    </p>
                </div>

                <ToastContainer />

            </section>

        </>
    )
}