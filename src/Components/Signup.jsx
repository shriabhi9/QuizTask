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
        const response = await axios.post("https://quizobackend.onrender.com/api/auth/register", {
          email,
          username,
          password,
        });
        alert("registered successfuly");
        localStorage.setItem("token", response.data.token);
      } catch (error) {
        alert("signup failed. Please try again.");
      }
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">SignUp</button>

        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          login
        </button>
      </form>
    </div>
  );
};

export default Signup;
