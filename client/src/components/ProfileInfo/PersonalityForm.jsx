import React, { useState } from "react";
import "./PersonalityForm.css";

const items = [
  "Extraverted - enthusiastic",
  "Critical - quarrelsome",
  "Dependable - self-disciplined",
  "Anxious - easily upset",
  "Open to new experiences - complex",
  "Reserved - quiet",
  "Sympathetic - warm",
  "Disorganized - careless",
  "Calm - emotionally stable",
  "Conventional - uncreative",
];

const PersonalityForm = ({ onBack, onSubmit }) => {
  const [traits, setTraits] = useState(Array(10).fill(""));

  const handleChange = (index, value) => {
    const updated = [...traits];
    updated[index] = value;
    setTraits(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const traitData = {};
    items.forEach((trait, i) => {
      traitData[`item${i + 1}`] = parseInt(traits[i]);
    });
    onSubmit(traitData); // Only send data to parent
  };

  return (
    <form onSubmit={handleSubmit} className="personality-container">
      {items.map((item, i) => (
        <div
          key={i}
          className={`personality-item ${
            traits[i] !== "" || i === 0 || traits[i - 1] !== "" ? "active" : ""
          }`}
        >
          <label>I see myself as: {item}</label>
          <div className="radio-group">
            {[
              { value: 1, label: "Disagree Strongly" },
              { value: 2, label: "Disagree Moderately" },
              { value: 3, label: "Slightly Disagree" },
              { value: 4, label: "Neutral" },
              { value: 5, label: "Slightly Agree" },
              { value: 6, label: "Agree Moderately" },
              { value: 7, label: "Agree Strongly" },
            ].map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={`trait-${i}`}
                  value={option.value}
                  checked={traits[i] === String(option.value)}
                  onChange={(e) => handleChange(i, e.target.value)}
                  disabled={i !== 0 && traits[i - 1] === ""}
                  required
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="nav-buttons">
        <button type="button" className="back-btn" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="submit-btn">
          Finish & Go to Dashboard
        </button>
      </div>
    </form>
  );
};

export default PersonalityForm;
