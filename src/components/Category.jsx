import React, { useEffect, useState } from 'react';
import getAxios from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Category() {
    const [name, setName] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const token = localStorage.getItem("token");

    const fetchCategories = async () => {
        try {
            const res = await getAxios().get("/categories");
            console.log("Backend data:", res.data);
            setAllCategories(Array.isArray(res.data) ? res.data : res.data.categories || []);
        } catch (error) {
            toast.error("Failed to fetch categories");
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    const resetForm = () => {
        setEditId(null);
        setName("");
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name) return toast.error("Category name required");

        if (allCategories.some(cat => cat.name.toLowerCase() === name.toLowerCase()))
            return toast.error("Category already exists");

        try {
            const res = await getAxios().post("/categories", { name });
            console.log("Backend response:", res.data);
            if (res.data) {
                toast.success("Category added successfully");
                resetForm();
                fetchCategories();
            } else {
                toast.error("Failed to save category");
            }
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error("Failed to add category");
        }

    };

    const updateCategory = async (e) => {
        e.preventDefault();
        if (!name || !editId) return toast.error("Category name required");

        try {
            await getAxios().post(`/updateCategories/${editId}`, { name });
            toast.success("Category updated successfully");
            resetForm();
            fetchCategories();
        } catch { toast.error("Failed to update category"); }
    };

    const handleEdit = (cat) => { setEditId(cat.id); setName(cat.name); };

    const deleteCategory = async (id) => {
        try {
            await getAxios().post(`/deleteCategories/${id}`);
            toast.success("Category deleted successfully");
            fetchCategories();
        } catch { toast.error("Failed to delete category"); }
    };

    return (
        <div className="max-w-3xl mx-auto mt-30 p-6 bg-white rounded-2xl shadow-lg">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                {editId ? "Update Category" : "Add Category"}
            </h2>

            <form onSubmit={editId ? updateCategory : handleAdd} className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    {editId ? "Update" : "Add"}
                </button>
                {editId && (
                    <button type="button"
                        onClick={resetForm}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition">
                        Cancel
                    </button>
                )}
            </form>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">All Categories</h3>

            {Array.isArray(allCategories) && allCategories.length > 0 ? (
                <ul className="space-y-3">
                    {allCategories.map((cat) => (
                        <li key={cat.id} className="flex justify-between items-center bg-gray-50 px-5 py-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
                            <span className="text-gray-800 font-medium">{cat.name}</span>
                            <div className="space-x-3">
                                <button onClick={() => handleEdit(cat)} className="text-yellow-600 hover:text-yellow-800 font-medium">Edit</button>
                                <button onClick={() => deleteCategory(cat.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center py-6">No categories available.</p>
            )}
        </div>
    );
}
