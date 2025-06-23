import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mental.css';
// import depressionImg from '../assets/depression.jpg';
// import anxietyImg from '../assets/anxiety.jpg';
// import stressImg from '../assets/stress.jpg';

const Mental = () => {
  const navigate = useNavigate();

  return (
    <div className="mental-container">
      <h2>Mental Health Dashboard</h2>
      <p className="mental-intro">
        Mental health issues like <strong>depression</strong>, <strong>anxiety</strong>, and <strong>stress</strong> are common but often go unnoticed —
        especially among working professionals and the elderly. Early detection is key to living a balanced life.
      </p>

      <div className="mental-cards">
        {/* Depression Card */}
        <div className="mental-card depression-card" onClick={() => navigate('/mentalCategories/Depression')}>
          <img src="" alt="Depression" className="mental-card-img" />
          <h3>Depression</h3>
          <p>
            Persistent sadness, fatigue, or a loss of interest? This test helps you check for signs of depression and assess its severity.
          </p>
          <button>Measure</button>
        </div>

        {/* Anxiety Card */}
        <div className="mental-card anxiety-card" onClick={() => navigate('/mentalCategories/anxiety')}>
          <img src="" alt="Anxiety" className="mental-card-img" />
          <h3>Anxiety</h3>
          <p>
            Do you often feel nervous, restless, or overwhelmed? Learn how intense your anxiety is and track your emotional patterns.
          </p>
          <button>Measure</button>
        </div>

        {/* Stress Card */}
        <div className="mental-card stress-card" onClick={() => navigate('/mentalCategories/stress')}>
          <img src="" alt="Stress" className="mental-card-img" />
          <h3>Stress</h3>
          <p>
            Constant deadlines or lack of rest can take a toll. Use this tool to understand your stress levels and get tips to manage it better.
          </p>
          <button>Measure</button>
        </div>
      </div>
    </div>
  );
};

export default Mental;
