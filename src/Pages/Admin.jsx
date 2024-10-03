// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState({ title: '', description: '', questions: [] });
  const [question, setQuestion] = useState({ questionText: '', options: '', correctAnswer: '' });
  const [editingQuizId, setEditingQuizId] = useState(null); // For editing existing quizzes

  // Function to fetch quizzes
  const fetchQuizzes = async () => {
    const response = await axios.get('https://quizobackend.onrender.com/api/quiz');
    setQuizzes(response.data);
  };

  // Fetch quizzes on component mount
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleAddQuiz = async () => {
    if (quiz.questions.length < 5) {
      alert('Each quiz must have at least 5 questions.');
      return;
    }

    if (editingQuizId) {
      // Update existing quiz
      await axios.put(`https://quizobackend.onrender.com/api/quiz/${editingQuizId}`, quiz, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEditingQuizId(null);
    } else {
      // Create new quiz
      await axios.post('https://quizobackend.onrender.com/api/quiz', quiz, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    }

    // Reset quiz state and refresh quizzes
    setQuiz({ title: '', description: '', questions: [] });
    setQuestion({ questionText: '', options: '', correctAnswer: '' });
    fetchQuizzes(); // Refresh the quizzes list
  };

  const handleDeleteQuiz = async (id) => {
    await axios.delete(`https://quizobackend.onrender.com/api/quiz/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setQuizzes(quizzes.filter((q) => q._id !== id));
  };

  const handleEditQuiz = (quizData) => {
    setQuiz(quizData);
    setEditingQuizId(quizData._id);
  };

  const handleAddQuestion = () => {
    const optionsArray = question.options.split(',').map(opt => opt.trim()); // Convert string to array
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { ...question, options: optionsArray }],
    });
    setQuestion({ questionText: '', options: '', correctAnswer: '' });
  };

  const handleDeleteQuestion = (index) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((_, idx) => idx !== index),
    });
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

        {/* Question Form */}
        <div className="mb-4">
          <label className="block text-gray-700">Question Text</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={question.questionText}
            onChange={(e) => setQuestion({ ...question, questionText: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Options (comma separated)</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={question.options}
            onChange={(e) => setQuestion({ ...question, options: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Correct Answer</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={question.correctAnswer}
            onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
          />
        </div>

        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Add Question
        </button>
        
        {/* List of Questions */}
        {quiz.questions.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Questions</h4>
            <ul className="mt-2">
              {quiz.questions.map((q, index) => (
                <li key={index} className="mb-2">
                  <div className="mb-2">
                    <strong>{q.questionText}</strong> <br />
                    <em>Options: {q.options.join(', ')}</em> <br />
                    <em>Correct Answer: {q.correctAnswer}</em>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg"
                  >
                    Delete Question
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Quiz */}
        <button
          onClick={handleAddQuiz}
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-4"
        >
          {editingQuizId ? 'Update Quiz' : 'Add Quiz'}
        </button>
      </form>

      {/* Existing Quizzes */}
      <h3 className="text-lg font-semibold mt-6">Existing Quizzes</h3>
      <ul className="mt-4">
        {quizzes.map((q) => (
          <li key={q._id} className="mb-2">
            <strong>{q.title}</strong> <br />
            <em>{q.description}</em>
            <button
              onClick={() => handleEditQuiz(q)}
              className="ml-2 bg-yellow-500 text-white py-1 px-3 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteQuiz(q._id)}
              className="ml-2 bg-red-500 text-white py-1 px-3 rounded-lg"
            >
              Delete Quiz
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
