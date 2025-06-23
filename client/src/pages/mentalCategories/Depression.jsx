import React, { useState } from "react";
import Swal from 'sweetalert2';
import "./Depression.css"; // Create and style this file as needed
const token = localStorage.getItem("token");

const depressionQuestions = [
  "I couldn't seem to experience any positive feeling at all.",
  "I couldn't seem to get any enjoyment out of the things I did.",
  "I just couldn't seem to get going.",
  "I felt down-hearted and blue.",
  "I felt that I had nothing to look forward to.",
  "I was unable to become enthusiastic about anything.",
  "I felt sad and depressed.",
  "I felt I wasn't worth much as a person.",
  "I felt that I had lost interest in just about everything.",
  "I felt I was pretty worthless.",
  "I could see nothing in the future to be hopeful about.",
  "I felt that life was meaningless.",
  "I felt that life wasn't worthwhile.",
  "I found it difficult to work up the initiative to do things.",
];

const options = [
  "Did not apply to me at all",
  "Applied to me to some degree / some of the time",
  "Applied to me to a considerable degree / a good part of the time",
  "Applied to me very much / most of the time",
];

const Depression = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(depressionQuestions.length).fill(null)
  );

  const handleOptionChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);
  };

  const goNext = () => {
    if (currentQuestion < depressionQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
  const data = {
    answers: answers, // array of 14 values (0–3)
  };

  try {
    const response = await fetch("http://localhost:5000/api/mental/depression/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("📬 Depression Prediction Result:", result);

    if (!response.ok) {
      throw new Error(result.error || 'Unknown server error');
    }

    // ✅ Show SweetAlert2 popup
    Swal.fire({
      title: 'Depression Result',
      text: `Your depression level is predicted as: ${result.prediction}`,
      icon: 'info',
      confirmButtonText: 'Okay',
      customClass: {
        popup: 'swal-wide'
      }
    });

  } catch (error) {
    console.error("❌ Error submitting depression data:", error);
    Swal.fire({
      title: 'Submission Failed',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
};

  return (
    <div className="depression-container">
      <div className="progress-bar">
        <div className="line" />
        <div className="circle">{currentQuestion + 1}</div>
        <div className="line" />
      </div>

      <h2>Depression Questionnaire</h2>
      <p className="question">{depressionQuestions[currentQuestion]}</p>

      <div className="options">
        {options.map((opt, idx) => (
          <label
            key={idx}
            className={`option ${
              answers[currentQuestion] === idx + 1 ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value={idx}
              checked={answers[currentQuestion] === idx}
              onChange={() => handleOptionChange(idx)}
            />
            {opt}
          </label>
        ))}
      </div>

      <div className="navigation-buttons">
        <button onClick={goPrevious} disabled={currentQuestion === 0}>
          Previous
        </button>
        {currentQuestion === depressionQuestions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answers[currentQuestion] === null}
          >
            Submit
          </button>
        ) : (
          <button onClick={goNext} disabled={answers[currentQuestion] === null}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Depression;
