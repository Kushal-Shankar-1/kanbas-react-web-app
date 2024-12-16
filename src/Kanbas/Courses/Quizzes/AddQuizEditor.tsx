// Quizzes/AddQuizEditor.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createQuiz } from "./client"; // Ensure this is a POST request
import { addQuiz } from "./quizzesReducer"; // Redux action
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

export default function AddQuizEditor() {
  const { cid } = useParams<{ cid: string }>(); // Course ID
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quizDetails, setQuizDetails] = useState({
    title: "",
    instructions: "",
    due: "",
    availableFrom: "",
    availableUntil: "",
    points: 0,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: true,
    minutes: "20",
    allowMultipleAttempts: false,
    assignTo: "Everyone",
    status: "unpublished",
    showCorrectAnswers: true,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestions: false,
    requiredToViewResults: false,
    requireLockdownBrowser: false,
    viewResponses: true,
    attemptNumber: 0,
    questions: [],
  });

  // Type Guard to check if the event is from a checkbox input
  const isCheckbox = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): e is React.ChangeEvent<HTMLInputElement> => {
    return e.target.type === "checkbox";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (isCheckbox(e)) {
      const { checked } = e.target;
      setQuizDetails(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setQuizDetails(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInstructionsChange = (content: string) => {
    setQuizDetails(prev => ({
      ...prev,
      instructions: content
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cid) {
      alert("Course ID is missing. Cannot create quiz.");
      return;
    }

    try {
      const newQuiz = await createQuiz(cid, quizDetails);
      dispatch(addQuiz(newQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div className="m-5">
      <h2>Create New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Quiz Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={quizDetails.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="instructions">Quiz Instructions</label>
          <ReactQuill
            theme="snow"
            value={quizDetails.instructions}
            onChange={handleInstructionsChange}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="due">Due Date</label>
          <input
            type="datetime-local"
            id="due"
            name="due"
            className="form-control"
            value={quizDetails.due}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="availableFrom">Available From</label>
          <input
            type="datetime-local"
            id="availableFrom"
            name="availableFrom"
            className="form-control"
            value={quizDetails.availableFrom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="availableUntil">Available Until</label>
          <input
            type="datetime-local"
            id="availableUntil"
            name="availableUntil"
            className="form-control"
            value={quizDetails.availableUntil}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="points">Points</label>
          <input
            type="number"
            id="points"
            name="points"
            className="form-control"
            value={quizDetails.points}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="quizType">Quiz Type</label>
          <select
            id="quizType"
            name="quizType"
            className="form-control"
            value={quizDetails.quizType}
            onChange={handleChange}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>

        {/* Add other fields similarly */}

        <button type="submit" className="btn btn-danger mt-4">Create Quiz</button>
        <button type="button" className="btn btn-secondary mt-4 ms-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>Cancel</button>
      </form>
    </div>
  );
}
