// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbars = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">
          Quiz App
        </Link>
        <div>
          <Link to="/login" className="mx-2">Login</Link>
          <Link to="/signup" className="mx-2">Signup</Link>
          <Link to="/admin" className="mx-2">Admin</Link>
          <Link to="/quiz" className="mx-2">Quiz</Link>
         </div>
      </div>
    </nav>
  );
};

export default Navbars;
