import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import StudentSignup from './components/student/StudentSignup';
import React from 'react';
import StudentLogin from './components/student/StudentLogin';
import AdminSignup from './components/admin/AdminSignup.jsx';
import AdminLogin from './components/admin/AdminLogin';
import Category from './components/Category';
import AddCourse from './components/AddCourse.jsx';


function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = ['/admin/register', '/admin/login', '/Category', '/add-course'];

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
        <Route path="/Category" element={<Category />} />
        <Route path="/add-course" element={<AddCourse />} />
      </Routes>
    </>
  );
}



function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
