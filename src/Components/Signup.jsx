import React from "react";
import { useState } from "react";
import axios from "axios";

const Signup = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://quizobackend.onrender.com/api/auth/register",
        {
          email,
          username,
          password,
        }
      );
      alert("registered successfuly");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      alert("signup failed. Please try again.");
    }
  };

  return (
    <div className="absolute right-24 mt-6 flex flex-col items-center gap-4 px-6 py-4 shadow-black shadow bg-white rounded-md">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="px-2 pt-2 rounded-md border-b-2 border-black"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="px-2 pt-2 rounded-md border-b-2 border-black"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="px-2 pt-2 rounded-md border-b-2 border-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          SignUp
        </button>

        <button
          onClick={() => {
            setShow(!show);
          }}
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default Signup;
