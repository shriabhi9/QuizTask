import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Navigate } from "react-router-dom";
import { useLoginDoneProperty } from "../Context/DoneContext";
import { useLoggedinProperty } from "../Context/LoginContext";

const Admin = () => {
  const { IsloggedIn, setIsLoggedIn } = useLoggedinProperty();
  const { LoginDone, setLoginDone } = useLoginDoneProperty();
  const [quizzes, setQuizzes] = useState([]); // Store all quizzes
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [question, setQuestion] = useState({
    questionText: "",
    options: [],
    correctAnswer: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Track if editing a quiz
  const [currentQuizId, setCurrentQuizId] = useState(null); // Store the quiz being edited

  // Fetch quizzes when the component loads
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(
        "https://quizobackend.onrender.com/api/quiz"
      );
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes", error);
    }
  };

  const addQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, question] });
    setQuestion({ questionText: "", options: [], correctAnswer: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `https://quizobackend.onrender.com/api/quiz/${currentQuizId}`,
          quiz
        );
        alert("Quiz updated successfully");
      } else {
        await axios.post("https://quizobackend.onrender.com/api/quiz", quiz);
        alert("Quiz added successfully");
      }
      fetchQuizzes(); // Refresh the list after adding/updating
      setQuiz({ title: "", description: "", questions: [] });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding/updating quiz", error);
    }
  };

  const handleEdit = (quiz) => {
    setIsEditing(true);
    setCurrentQuizId(quiz._id); // Store the ID of the quiz being edited
    setQuiz({
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions,
    });
  };

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(
        `https://quizobackend.onrender.com/api/quiz/${quizId}`
      );
      alert("Quiz deleted successfully");
      fetchQuizzes(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting quiz", error);
    }
  };
  if (!IsloggedIn) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      {!LoginDone ? (
        <h1>you must have logged in to access this page</h1>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-2xl mb-10">Admin Panel</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 w-full shadow-lg px-10 py-8"
          >
            <input
              className="px-2 pt-2 rounded-md border-b-2 border-black w-[400px]"
              type="text"
              placeholder="Quiz Title"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
            <input
              className="px-2 pt-2 rounded-md border-b-2 border-black w-[400px]"
              type="text"
              placeholder="Description"
              value={quiz.description}
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
            />
            <div className="flex flex-col gap-6 items-center">
              <input
                className="px-2 pt-2 rounded-md border-b-2 border-black w-[400px]"
                type="text"
                placeholder="Question Text"
                value={question.questionText}
                onChange={(e) =>
                  setQuestion({ ...question, questionText: e.target.value })
                }
              />
              <input
                className="px-2 pt-2 rounded-md border-b-2 border-black w-[400px]"
                type="text"
                placeholder="Options (comma separated)"
                value={question.options.join(", ")}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    options: e.target.value.split(", "),
                  })
                }
              />
              <input
                className="px-2 pt-2 rounded-md border-b-2 border-black w-[400px]"
                type="text"
                placeholder="Correct Answer"
                value={question.correctAnswer}
                onChange={(e) =>
                  setQuestion({ ...question, correctAnswer: e.target.value })
                }
              />
              <button
                type="button"
                onClick={addQuestion}
                className="px-4 py-2 rounded-lg bg-black text-white w-[200px]"
              >
                Add Question
              </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-black text-white text-center w-[200px]"
            >
              {isEditing ? "Update Quiz" : "Submit Quiz"}
            </button>
          </form>

          {/* Display List of Quizzes */}
          <h2 className="text-xl mt-10">Quizzes</h2>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="flex items-center gap-2 flex-col">
                <strong>{quiz.title}</strong> - {quiz.description}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(quiz)}
                    className="px-4 py-2 rounded-lg bg-black text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="px-4 py-2 rounded-lg bg-black text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;
