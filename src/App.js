import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import QuizPage from "./Pages/QuizPage";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
