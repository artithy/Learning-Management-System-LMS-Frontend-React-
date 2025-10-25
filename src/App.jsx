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

function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = [
    '/admin/register',
    '/admin/login',
    '/admin',
    '/admin/add-course',
    '/admin/course-list',
    '/admin/category',
  ];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/student/register" element={<StudentSignup />} />
        <Route path="/student/login" element={<StudentLogin />} />

        <Route path="/admin/register" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/*" element={<AdminDashboard />} />
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
