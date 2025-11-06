import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import StudentSignup from './components/student/StudentSignup';
import StudentLogin from './components/student/StudentLogin';
import AdminSignup from './components/admin/AdminSignup';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import CourseDetails from "./components/CourseDetails";
import CourseGrid from './components/CourseGrid';
import StudentDashboard from './components/student/StudentDashboard';
import StudentProfile from './components/student/StudentProfile';
import PaymentSuccess from './components/student/PaymentSuccess';
import StudentMyEnrollment from './components/student/StudentMyEnrollments';

function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/student/register" element={<StudentSignup />} />
        <Route path="/student/login" element={<StudentLogin />} />

        <Route path="/admin/register" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/courses" element={<CourseGrid showCategories={true} />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/payment-success" element={<PaymentSuccess />} />
        <Route path="/student/enrollments" element={<StudentMyEnrollment />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
