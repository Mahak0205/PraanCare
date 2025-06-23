// Anxiety.jsx
import React, { useState } from "react";
import "./Anxiety.css";
import Swal from 'sweetalert2';
const token = localStorage.getItem('token');


const anxietyQuestions = [
  "I was aware of dryness of my mouth.",
  "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion).",
  "I experienced trembling (e.g., in the hands).",
  "I was worried about situations in which I might panic and make a fool of myself.",
  "I felt I was close to panic.",
  "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat).",
  "I felt scared without any good reason.",
  "I felt that I was using a lot of nervous energy.",
  "I found myself in situations that made me so anxious I was most relieved when they ended.",
  "I was worried about my physical health.",
  "I was concerned about the possibility of losing control of my bodily functions.",
  "I found it difficult to relax.",
  "I had a feeling of shakiness (e.g., legs going to give way).",
  "I felt I was going to faint in a public place.",
];

const options = [
  "Did not apply to me at all",
  "Applied to me to some degree / some of the time",
  "Applied to me to a considerable degree / a good part of the time",
  "Applied to me very much / most of the time",
];

const Anxiety = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(anxietyQuestions.length).fill(null)
  );

  const handleOptionChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);
  };

  const goNext = () => {
    if (currentQuestion < anxietyQuestions.length - 1) {
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
    answers: answers, // Array of 14 values (0–3)
  };

  try {
    const response = await fetch("http://localhost:5000/api/mental/anxiety/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("📬 Anxiety Prediction Result:", result);

    if (!response.ok) {
      throw new Error(result.error || 'Unknown server error');
    }

    // ✅ Replace alert with SweetAlert2 popup
    Swal.fire({
      title: 'Anxiety Result',
      text: `Your anxiety level is predicted as: ${result.prediction}`,
      icon: 'info',
      confirmButtonText: 'Okay',
      customClass: {
        popup: 'swal-wide'
      }
    });

  } catch (error) {
    console.error("❌ Error submitting anxiety data:", error);
    Swal.fire({
      title: 'Submission Failed',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
};

  return (
    <div className="anxiety-container">
      <div className="progress-bar">
        <div className="line" />
        <div className="circle">{currentQuestion + 1}</div>
        <div className="line" />
      </div>

      <h2>Anxiety Questionnaire</h2>
      <p className="question">{anxietyQuestions[currentQuestion]}</p>

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
        {currentQuestion === anxietyQuestions.length - 1 ? (
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

export default Anxiety;
