import React from "react";
import CourseGrid from "../CourseGrid";
import StudentTopbar from './StudentTopbar';

export default function StudentDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <StudentTopbar />
            <div className="pt-20 px-4">
                <CourseGrid showCategories={true} showEnrolledOnly={true} noTopMargin={true} />
            </div>
        </div>
    );
}
