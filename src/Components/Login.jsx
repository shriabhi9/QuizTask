import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLoginProperty } from "../Context/Login-context";
import { useLoginShow } from "../Context/LoginShow-context";

const Login = ({ show, setShow }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { LoginProperty, setLoginProperty } = useLoginProperty();
  const { LoginShow, setLoginShow } = useLoginShow();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://quizobackend.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      alert("Login successfully");
      setLoginProperty(!LoginProperty);
      setLoginShow(!LoginShow);
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Login;
