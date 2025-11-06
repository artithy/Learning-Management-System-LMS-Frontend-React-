import React from "react";
import CourseGrid from "../CourseGrid";
import StudentTopbar from './StudentTopbar';

export default function StudentDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-10 mt-10">
            <StudentTopbar />
            <div className="py-10">
                <CourseGrid showCategories={true} showEnrolledOnly={true} />
            </div>
        </div>
    );
}
