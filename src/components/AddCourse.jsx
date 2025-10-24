import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAxios from "../../utils/axios";


export default function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [instructor, setInstructor] = useState("");
    const [totalLessons, setTotalLessons] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await getAxios().get("/categories");
                setCategories(res.data);

            } catch (error) {
                console.error("Failed to fetch categories: ", error);
                toast.error("Failed to load categories")

            }
        }
        fetchCategories();
    }, []);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) { return };

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !price || !categoryId) {
            toast.error("Please fill up all the fields");
            return;
        }

        const data = {
            title,
            description,
            price,
            discount_price: discountPrice,
            duration,
            image,
            category_id: categoryId,
            instructor_name: instructor,
            total_lessons: totalLessons
        };

        try {
            const token = localStorage.getItem("token");
            const res = await getAxios().post("/courses", data);
            toast.success(res.data.message || "Course added successfully");

            setTitle("");
            setDescription("");
            setPrice("");
            setDiscountPrice("");
            setDuration("");
            setImage("");
            setCategoryId("");
            setInstructor("");
            setTotalLessons("");
        } catch (error) {
            console.log("Course creation failed", error);
            toast.error("Failed to add course.");

        }


    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                    Add a New Course
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Course Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Advanced JavaScript Masterclass"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            placeholder="Write a short course overview..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 120"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Discount Price
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 99"
                                value={discountPrice}
                                onChange={(e) => setDiscountPrice(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Duration <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. 8 weeks"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Total Lessons <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 25"
                                value={totalLessons}
                                onChange={(e) => setTotalLessons(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Instructor Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. John Doe"
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Course Thumbnail <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        {image && (
                            <img
                                src={image}
                                alt="Preview"
                                className="w-40 h-28 object-cover mt-3 rounded-lg shadow-md"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition duration-300"
                    >
                        ➕ Add Course
                    </button>
                </form>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
}
