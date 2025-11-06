import React from "react";
export default function DashboardBox({ title, value }) {
    return (<>
        <div className="p-5 bg-white rounded hover:bg-blue-50 transition">
            <h3 className="text-gray-600 text-sm">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value || 0}</p>
        </div>
    </>);
}