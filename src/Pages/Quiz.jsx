// src/pages/Quiz.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get('https://quizobackend.onrender.com/api/quiz');
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
  };

  const handleSubmitQuiz = () => {
    let currentScore = 0;
    quizzes[currentQuizIndex].questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setIsQuizCompleted(true);
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      {!isQuizCompleted ? (
        <div>
          {quizzes.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {quizzes[currentQuizIndex].title}
              </h2>
              <p className="text-lg font-semibold">
                {quizzes[currentQuizIndex].questions[currentQuestionIndex].questionText}
              </p>
              <div className="mt-4">
                {quizzes[currentQuizIndex].questions[currentQuestionIndex].options.map((option, index) => (
                  <label key={index} className="block">
                    <input
                      type="radio"
                      className="mr-2"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={selectedAnswers[currentQuestionIndex] === option}
                      onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-6"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg">Your Score: {score} / {quizzes[currentQuizIndex].questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
