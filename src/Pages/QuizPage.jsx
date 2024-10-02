import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]); // Store an array of quizzes
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Track the current quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question within the quiz
  const [score, setScore] = useState(0); // Score for the current quiz
  const [userAnswers, setUserAnswers] = useState([]); // Store the user's answers for the current quiz
  const [userAnswer, setUserAnswer] = useState(""); // Store the current answer selection
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

  const handleNextQuestion = () => {
    const currentQuiz = quizzes[currentQuizIndex];
    // Store the answer for the current question
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = userAnswer;
    setUserAnswers(updatedUserAnswers);

    if (userAnswer === currentQuiz?.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1); // Increment score if the answer is correct
    }

    if (currentQuestionIndex + 1 < currentQuiz?.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
      setUserAnswer(""); // Reset current answer
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Move back to the previous question
      setUserAnswer(userAnswers[currentQuestionIndex - 1] || ""); // Pre-fill the previous answer if it exists
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true); // Mark the quiz as submitted
  };

  const handleNextQuiz = () => {
    setIsSubmitted(false); // Reset submission state
    setScore(0); // Reset score
    setCurrentQuestionIndex(0); // Reset question index
    setUserAnswers([]); // Clear previous answers
    setUserAnswer(""); // Clear current answer
    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex(currentQuizIndex + 1); // Move to the next quiz
    } else {
      alert("You have completed all quizzes!");
    }
  };

  // Ensure quizzes and questions are loaded before rendering
  if (!quizzes.length) return <div>Loading...</div>;

  const currentQuiz = quizzes[currentQuizIndex]; // The current quiz being displayed

  return (
    <div>
      <Navbar />
      <div>
        <h1>{currentQuiz.title}</h1>
        {isSubmitted ? (
          <div>
            <h2>
              Your Final Score: {score} / {currentQuiz.questions.length}
            </h2>
            {currentQuizIndex + 1 < quizzes.length ? (
              <button onClick={handleNextQuiz}>Next Quiz</button>
            ) : (
              <button onClick={() => window.location.reload()}>Restart</button>
            )}
          </div>
        ) : (
          <div>
            <p>{currentQuiz.questions[currentQuestionIndex].questionText}</p>
            {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={userAnswer === option ? "selected" : ""}
                onClick={() => setUserAnswer(option)}
              >
                {option}
              </button>
            ))}

            <div>
              {currentQuestionIndex > 0 && (
                <button onClick={handlePreviousQuestion}>Back</button>
              )}
              {currentQuestionIndex + 1 < currentQuiz.questions.length ? (
                <button onClick={handleNextQuestion}>Next</button>
              ) : (
                <button onClick={handleSubmitQuiz}>Submit Quiz</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
