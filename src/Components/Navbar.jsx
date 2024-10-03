import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { useLoginProperty } from "../Context/Login-context";
import { useLoginShow } from "../Context/LoginShow-context";
import { useLoginDoneProperty } from "../Context/DoneContext";
import { useLoggedinProperty } from "../Context/LoginContext";
const Navbar = () => {
  const navigate = useNavigate();
  const {IsLoggedIn , setIsLoggedIn} = useLoggedinProperty();
  const { LoginDone, setLoginDone } = useLoginDoneProperty();
  const { LoginShow, setLoginShow } = useLoginShow();
  const { LoginProperty, setLoginProperty } = useLoginProperty();

  function LoginButtonHandler() {
    setLoginShow(!LoginShow);
    console.log(LoginShow);
  }
  function logoutButtonHandler() {
    setIsLoggedIn(false);
    navigate('/');
    setLoginShow(false);
    setLoginProperty(!LoginProperty);
    setLoginDone(false);
  }
  return (
    <div className="flex items-center justify-center w-[100%]">
      <header className="w-full flex items-center justify-around py-4">
        <img src="/logo.svg" alt="logo" />
        <div className="flex gap-32">
          <Link to={"/"}>
            <button>Home</button>
          </Link>
          <Link to={"/admin"}>
            <button>Admin</button>
          </Link>
          <Link to={"/quiz"}>
            <button>Quiz</button>
          </Link>
        </div>
        <div>
          {!LoginProperty ? (
            <button onClick={LoginButtonHandler} className="px-4 py-2 rounded-lg bg-black text-white">Login</button>
          ) : (
            <button onClick={logoutButtonHandler} className="px-4 py-2 rounded-lg bg-black text-white">Logout</button>
          )}
          {LoginShow ? <Auth></Auth> : ""}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
