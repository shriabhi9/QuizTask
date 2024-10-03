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
      try {
        const response = await axios.get('https://quizobackend.onrender.com/api/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
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

  // Check if quizzes are loaded and ensure the current quiz and current question exist before rendering
  if (!quizzes.length || !quizzes[currentQuizIndex]?.questions[currentQuestionIndex]) {
    return <div className="text-center">Loading quiz...</div>;  // Show loading state until the data is ready
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      {!isQuizCompleted ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{currentQuiz.title}</h2>
          <p className="text-lg font-semibold">{currentQuestion.questionText}</p>
          <div className="mt-4">
            {currentQuestion.options.map((option, index) => (
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
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg">Your Score: {score} / {currentQuiz.questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
