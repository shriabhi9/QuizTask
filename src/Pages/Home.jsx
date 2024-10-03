// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="text-center my-10">
      <h1 className="text-4xl font-bold">Welcome to the Quiz App!</h1>
      <p className="mt-4 text-lg">
        Test your knowledge with our wide range of quizzes. Sign up or log in to create and take quizzes!
      </p>
      <div className="mt-6">
        <a href="/signup" className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4">Sign Up</a>
        <a href="/login" className="bg-gray-500 text-white py-2 px-4 rounded-lg">Login</a>
      </div>
    </div>
  );
};

export default Home;
