// Stress.jsx
import React, { useState } from "react";
import Swal from 'sweetalert2';
import "./Stress.css";
const token = localStorage.getItem('token');

const stressQuestions = [
  "I found it hard to wind down.",
  "I tended to over-react to situations.",
  "I felt that I was using a lot of nervous energy.",
  "I found myself getting agitated.",
  "I found it difficult to relax.",
  "I was intolerant of anything that kept me from getting on with what I was doing.",
  "I felt that I was rather touchy.",
  "I found it hard to calm down after something upset me.",
  "I was unable to become enthusiastic about anything.",
  "I felt that I was not worth much as a person.",
  "I felt that I was rather touchy.",
  "I felt scared without any good reason.",
  "I felt that life was meaningless.",
  "I found it difficult to tolerate interruptions to what I was doing.",
];

const options = [
  "Did not apply to me at all",
  "Applied to me to some degree / some of the time",
  "Applied to me to a considerable degree / a good part of the time",
  "Applied to me very much / most of the time",
];

const Stress = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(stressQuestions.length).fill(null)
  );

  const handleOptionChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);
  };

  const goNext = () => {
    if (currentQuestion < stressQuestions.length - 1) {
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
    const response = await fetch("http://localhost:5000/api/mental/stress/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` // ✅ using localStorage
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("📬 Stress Prediction Result:", result);

    if (!response.ok) {
      throw new Error(result.error || 'Unknown server error');
    }

    // ✅ SweetAlert2 popup for stress result
    Swal.fire({
      title: 'Stress Result',
      text: `Your stress level is predicted as: ${result.prediction}`,
      icon: 'info',
      confirmButtonText: 'Okay',
      customClass: {
        popup: 'swal-wide'
      }
    });

  } catch (error) {
    console.error("❌ Error submitting stress data:", error);
    Swal.fire({
      title: 'Submission Failed',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
};

  return (
    <div className="stress-container">
      <div className="progress-bar">
        <div className="line" />
        <div className="circle">{currentQuestion + 1}</div>
        <div className="line" />
      </div>

      <h2>Stress Questionnaire</h2>
      <p className="question">{stressQuestions[currentQuestion]}</p>

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
        {currentQuestion === stressQuestions.length - 1 ? (
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

export default Stress;
