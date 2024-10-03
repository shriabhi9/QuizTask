import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useLoginDoneProperty } from "../Context/DoneContext";

const QuizPage = () => {
  const { LoginDone } = useLoginDoneProperty();
  const [quizzes, setQuizzes] = useState([]); // Store an array of quizzes
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Track the current quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question within the quiz
  const [score, setScore] = useState(0); // Score for the current quiz
  const [selectedOptions, setSelectedOptions] = useState({}); // Store selected answers per question
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the quiz is submitted

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`https://quizobackend.onrender.com/api/quiz`);
        setQuizzes(response.data); // Set the quizzes array
      } catch (error) {
        alert(error);
      }
    };
    fetchQuizzes();
  }, []); // Add an empty dependency array to avoid re-fetching the data on every render

  const handleOptionChange = (option) => {
    const currentQuestion = quizzes[currentQuizIndex].questions[currentQuestionIndex];
    const updatedOptions = { ...selectedOptions };
    
    if (updatedOptions[currentQuestionIndex]) {
      // If the option was already selected, deselect it
      if (updatedOptions[currentQuestionIndex].includes(option)) {
        updatedOptions[currentQuestionIndex] = updatedOptions[currentQuestionIndex].filter(
          (o) => o !== option
        );
      } else {
        // Otherwise, select it
        updatedOptions[currentQuestionIndex].push(option);
      }
    } else {
      // If this is the first time selecting an option for this question
      updatedOptions[currentQuestionIndex] = [option];
    }

    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const correctAnswers = currentQuestion.correctAnswer.split(", ").map((ans) => ans.trim());
    const userAnswers = selectedOptions[currentQuestionIndex] || [];

    // Check if user's selected answers match the correct answers
    if (JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers.sort())) {
      setScore(score + 1); // Increment score if the selected answers are correct
    }

    if (currentQuestionIndex + 1 < currentQuiz?.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Move back to the previous question
    }
  };

  const handleSubmitQuiz = () => {
    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const correctAnswers = currentQuestion.correctAnswer.split(", ").map((ans) => ans.trim());
    const userAnswers = selectedOptions[currentQuestionIndex] || [];

    if (JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers.sort())) {
      setScore(score + 1); // Increment score if the selected answers are correct
    }
    
    setIsSubmitted(true); // Mark the quiz as submitted
  };

  const handleNextQuiz = () => {
    setIsSubmitted(false); // Reset submission state
    setScore(0); // Reset score
    setCurrentQuestionIndex(0); // Reset question index
    setSelectedOptions({}); // Clear selected answers
    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex(currentQuizIndex + 1); // Move to the next quiz
    } else {
      alert("You have completed all quizzes!");
    }
  };

  // Ensure quizzes and questions are loaded before rendering
  const currentQuiz = quizzes[currentQuizIndex]; // The current quiz being displayed

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {!LoginDone ? (
          <h1 className="text-center text-red-500 font-bold text-xl">You must be logged in to access this page</h1>
        ) : (
          <div>
            {!quizzes.length ? (
              <div className="text-center text-lg font-medium text-gray-700">Loading...</div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">{currentQuiz.title}</h1>
                {isSubmitted ? (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">
                      Your Final Score: {score} / {currentQuiz.questions.length}
                    </h2>
                    {currentQuizIndex + 1 < quizzes.length ? (
                      <button
                        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                        onClick={handleNextQuiz}
                      >
                        Next Quiz
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
                        onClick={() => window.location.reload()}
                      >
                        Restart
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-4">
                      {currentQuiz.questions[currentQuestionIndex].questionText}
                    </p>
                    <div className="space-y-2 mb-4">
                      {currentQuiz.questions[currentQuestionIndex].options.map(
                        (option, index) => (
                          <label key={index} className="block">
                            <input
                              type="checkbox"
                              className="mr-2 h-5 w-5 text-indigo-600 rounded"
                              checked={
                                selectedOptions[currentQuestionIndex]?.includes(option) || false
                              }
                              onChange={() => handleOptionChange(option)}
                            />
                            <span className="text-lg text-gray-800">{option}</span>
                          </label>
                        )
                      )}
                    </div>

                    <div className="flex justify-between">
                      {currentQuestionIndex > 0 && (
                        <button
                          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                          onClick={handlePreviousQuestion}
                        >
                          Back
                        </button>
                      )}
                      {currentQuestionIndex + 1 < currentQuiz.questions.length ? (
                        <button
                          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                          onClick={handleNextQuestion}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
                          onClick={handleSubmitQuiz}
                        >
                          Submit Quiz
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
