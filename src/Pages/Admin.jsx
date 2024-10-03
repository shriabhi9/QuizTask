// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState({ title: '', description: '', questions: [] });
  const [question, setQuestion] = useState({ questionText: '', options: [], correctAnswer: '' });

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get('https://quizobackend.onrender.com/api/quiz');
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  const handleAddQuiz = async () => {
    await axios.post('https://quizobackend.onrender.com/api/quiz', quiz, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setQuiz({ title: '', description: '', questions: [] });
  };

  const handleDeleteQuiz = async (id) => {
    await axios.delete(`https://quizobackend.onrender.com/api/quiz/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setQuizzes(quizzes.filter((q) => q._id !== id));
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Quizzes</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-gray-700">Quiz Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
        </div>
        <button
          onClick={handleAddQuiz}
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-4"
        >
          Add Quiz
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6">Existing Quizzes</h3>
      <ul className="mt-4">
        {quizzes.map((q) => (
          <li key={q._id} className="mb-2">
            <span>{q.title}</span>
            <button
              onClick={() => handleDeleteQuiz(q._id)}
              className="ml-2 bg-red-500 text-white py-1 px-3 rounded-lg"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
