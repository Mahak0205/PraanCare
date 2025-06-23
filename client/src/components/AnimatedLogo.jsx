import React from "react";
import "./AnimatedLogo.css";

const AnimatedLogo = () => {
  return (
    <div className="logo-wrapper">
      <div className="logo-icon">
        {/* Heartbeat Line */}
        <svg
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
          className="heartbeat-line"
        >
          <polyline
            points="0,30 30,30 40,10 50,50 60,30 80,30 90,20 100,40 110,30 200,30"
            fill="none"
            stroke="#e11d48"  /* red */
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mental wellness symbol */}
        <div className="wellbeing-icon">🧘‍♀️</div>

        {/* Pulse Dot */}
        <div className="pulse-dot"></div>
      </div>

      {/* PraanCare Text */}
      <h1 className="logo-title">
        Praan<span>Care</span>
      </h1>
    </div>
  );
};

export default AnimatedLogo;
