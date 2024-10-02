import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import { useLoginProperty } from "../Context/Login-context";
import { useLoginShow } from "../Context/LoginShow-context";
const Navbar = () => {
  const { LoginShow, setLoginShow } = useLoginShow();
  const { LoginProperty, setLoginProperty } = useLoginProperty();

  function LoginButtonHandler() {
    setLoginShow(!LoginShow);
    console.log(LoginShow);
  }
  function logoutButtonHandler() {
    setLoginShow(false);
    setLoginProperty(!LoginProperty);
  }
  return (
    <div>
      <header>
        <img src="/logo.svg" alt="logo" />
        <div>
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
            <button onClick={LoginButtonHandler}>Login</button>
          ) : (
            <button onClick={logoutButtonHandler}>Logout</button>
          )}
          {LoginShow ? <Auth></Auth> : ""}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
