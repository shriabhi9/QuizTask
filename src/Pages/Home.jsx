import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl pt-10 animate-bounce">
          "Test Your Knowledge: Quizzes for Every Mind!"
        </h1>
        <p className="pt-4 px-40 text-center">
          Welcome to the ultimate quiz platform, where learning meets fun!
          Whether you're a trivia master or just looking to sharpen your
          knowledge, explore quizzes across a variety of topics. From history to
          pop culture, we have something for everyone. Log in now to create your
          own quizzes, track your progress, and challenge your friends to see
          who comes out on top!
        </p>
        <Link to={'/admin'}>
          <button className="mt-10 px-4 py-2 rounded-lg bg-black text-white">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
