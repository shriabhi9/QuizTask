import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLoginProperty } from "../Context/Login-context";
import { useLoginShow } from "../Context/LoginShow-context";
import { useLoginDoneProperty } from "../Context/DoneContext";
import { useLoggedinProperty } from "../Context/LoginContext";


const Login = ({ show, setShow}) => {
  const {isLoggedIn, setIsLoggedIn} = useLoggedinProperty();
  const {LoginDone, setLoginDone} = useLoginDoneProperty();
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
      setIsLoggedIn(!isLoggedIn);
      setLoginDone(!LoginDone);
      setLoginProperty(!LoginProperty);
      setLoginShow(!LoginShow);
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="absolute right-24 mt-6 flex flex-col items-center gap-4 px-6 py-4 shadow-black shadow bg-white rounded-md">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button type="submit" className="px-4 py-2 rounded-lg bg-black text-white">Login</button>
        
        <button
        className="px-4 py-2 rounded-lg bg-black text-white"
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
