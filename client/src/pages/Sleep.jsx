import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

import './Sleep.css';

const occupationMap = {
  'Software Engineer': 0,
  'Doctor': 1,
  'Sales Representative': 2,
  'Teacher': 3,
  'Nurse': 4,
  'Engineer': 5,
  'Accountant': 6,
  'Scientist': 7,
  'Lawyer': 8,
  'Salesperson': 9,
  'Manager': 10
};

const stressLabels = {
  1: "Mild",
  2: "Normal",
  3: "Moderate",
  4: "Severe",
  5: "Extremely Severe"
};

const Sleep = () => {
  const [formData, setFormData] = useState({
    sleepDuration: "",
    qualityOfSleep: "",
    physicalActivity: "",
    stressLevel: "",
    heartRate: "",
    dailySteps: "",
    systolicBP: "",
    diastolicBP: "",
    height: "",
    weight: "",
    occupation: ""
  });

  const calculateBMICategory = (heightCm, weightKg) => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    if (bmi < 18.5) return 0;
    if (bmi >= 18.5 && bmi < 25) return 1;
    if (bmi >= 25 && bmi < 30) return 2;
    return 3;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  const bmiCategory = calculateBMICategory(
    Number(formData.height),
    Number(formData.weight)
  );

  const payload = {
    sleepDuration: Number(formData.sleepDuration),
    qualityOfSleep: Number(formData.qualityOfSleep),
    physicalActivity: Number(formData.physicalActivity),
    stressLevel: Number(formData.stressLevel),
    bmiCategory,
    heartRate: Number(formData.heartRate),
    dailySteps: Number(formData.dailySteps),
    systolicBP: Number(formData.systolicBP),
    diastolicBP: Number(formData.diastolicBP),
    occupation: occupationMap[formData.occupation]
  };

  try {
    const response = await fetch("http://localhost:5000/api/sleep/predictsleep", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("🛏️ Sleep Prediction Result:", result);

    if (!response.ok) {
      throw new Error(result.error || 'Unknown server error');
    }

    // ✅ Show the result using SweetAlert2
    Swal.fire({
      title: 'Sleep Disorder Prediction',
      text: `Your predicted sleep disorder: ${result.prediction}`,
      icon: 'info',
      confirmButtonText: 'Got it!',
      customClass: {
        popup: 'swal-wide'
      }
    });

  } catch (error) {
    console.error("❌ Error submitting sleep data:", error);
    Swal.fire({
      title: 'Submission Failed',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Retry'
    });
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sleep Detail Form</h2>

      <label>Occupation:</label>
      <select name="occupation" onChange={handleChange} required>
        <option value="">Select Occupation</option>
        {Object.keys(occupationMap).map((occ, idx) => (
          <option key={idx} value={occ}>{occ}</option>
        ))}
      </select>

      <label>Sleep Duration (hrs):</label>
      <input name="sleepDuration" type="number" step="0.1" onChange={handleChange} required />

      <label>Quality of Sleep (1–10):</label>
      <input name="qualityOfSleep" type="number" min="1" max="10" onChange={handleChange} required />

      <label>Physical Activity Level (mins/day):</label>
      <input name="physicalActivity" type="number" onChange={handleChange} required />

      <label>Stress Level:</label>
      <select name="stressLevel" onChange={handleChange} required>
        <option value="">Select Stress Level</option>
        {Object.entries(stressLabels).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label>Heart Rate (bpm):</label>
      <input name="heartRate" type="number" onChange={handleChange} required />

      <label>Daily Steps:</label>
      <input name="dailySteps" type="number" onChange={handleChange} required />

      <label>Systolic (higher) BP:</label>
      <input name="systolicBP" type="number" onChange={handleChange} required />

      <label>Diastolic (lower) BP:</label>
      <input name="diastolicBP" type="number" onChange={handleChange} required />

      <label>Height (cm):</label>
      <input name="height" type="number" onChange={handleChange} required />

      <label>Weight (kg):</label>
      <input name="weight" type="number" onChange={handleChange} required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Sleep;
