import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Admin = () => {
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
      const response = await axios.get("https://quizobackend.onrender.com/api/quiz");
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
        await axios.put(`https://quizobackend.onrender.com/api/quiz/${currentQuizId}`, quiz);
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
      await axios.delete(`https://quizobackend.onrender.com/api/quiz/${quizId}`);
      alert("Quiz deleted successfully");
      fetchQuizzes(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting quiz", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Quiz Title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
          <div>
            <input
              type="text"
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) =>
                setQuestion({ ...question, questionText: e.target.value })
              }
            />
            <input
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
              type="text"
              placeholder="Correct Answer"
              value={question.correctAnswer}
              onChange={(e) =>
                setQuestion({ ...question, correctAnswer: e.target.value })
              }
            />
            <button type="button" onClick={addQuestion}>
              Add Question
            </button>
          </div>
          <button type="submit">
            {isEditing ? "Update Quiz" : "Submit Quiz"}
          </button>
        </form>

        {/* Display List of Quizzes */}
        <h2>Quizzes</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <strong>{quiz.title}</strong> - {quiz.description}
              <button onClick={() => handleEdit(quiz)}>Edit</button>
              <button onClick={() => handleDelete(quiz._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
