// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbars from "./components/Navbars";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Quiz from "./Pages/Quiz";

function App() {
  return (
    <div>
      <Navbars />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
