import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import StudentSignup from './components/student/StudentSignup';
import React from 'react';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/student/register" element={<StudentSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
