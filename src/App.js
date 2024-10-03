// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbars from './components/Navbars';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';

function App() {
  return (
    <Router>
      <Navbars />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/quiz" element={<Quiz/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
