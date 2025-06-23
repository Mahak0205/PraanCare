import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faEye,
  faBrain,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedLogo from "../components/AnimatedLogo"; // Adjust path if needed
import HealthTag from "../components/HealthTag";
import React, { useState, useEffect } from "react";
import "./Home.css"; //
import { useNavigate } from "react-router-dom";
import HomeIntro from "../assets/Home/HomeIntro.png";
import sleep from "../assets/Home/baby-sleep.gif";
import mental from "../assets/Home/intelligent.gif";
import heart from "../assets/Home/solidarity.gif";
import eye from "../assets/Home/vision.gif";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set login state from localStorage when component mounts: for appearance and disppearance of get started
  useEffect(() => {
    const storedStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedStatus);
  }, []);

  // For scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const elements = document.querySelectorAll(".why-block");
    elements.forEach((el) => observer.observe(el));

    // ✅ CLEANUP FUNCTION: remove observers when component unmounts
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const testimonials = [
    {
      name: "Ravi Sharma",
      quote:
        "PraanCare helped me detect early signs of stress and fix my sleep schedule.",
    },
    {
      name: "Anita Verma",
      quote:
        "I love how easy it is to track my eye health, especially with so much screen time!",
    },
    {
      name: "Devansh Patel",
      quote:
        "I check my heart stats daily using PraanCare – it keeps me informed and motivated.",
    },
  ];

  return (
    <div className="homepage-container">
      <div className="intro-section">
        {/* <AnimatedLogo /> */}
        <h1 className="typewriter">Welcome to PraanCare</h1>
        <div className="info-img">
          <p>
            A personal health monitoring system for working professionals and
            elderly people. Track your <strong>Cardiac</strong>,{" "}
            <strong>Eye</strong>, <strong>Stress</strong>, and{" "}
            <strong>Sleep</strong> health with ease.
          </p>
          <img src={HomeIntro} alt="Overview" />
        </div>
        {!isLoggedIn && (
          <button onClick={() => navigate("/login")} className="cta-btn">
            Get Started
          </button>
        )}
      </div>

      <div className="why-us-section">
        <h2>Why Choose PraanCare?</h2>

        <div className="why-block">
          <h3>1. The Struggles of Today’s Working Professionals & Elderly</h3>
          <p>
            With sedentary lifestyles, irregular schedules, work stress, and
            increased screen time, working professionals today are more
            vulnerable to chronic conditions than ever before. Meanwhile,
            elderly people face age-related issues like cardiac irregularities,
            vision problems, sleep disorders, and undiagnosed mental health
            concerns — often without timely detection or monitoring.
          </p>
        </div>

        <div className="why-block">
          <h3>2. Why is Preventive Healthcare So Important?</h3>
          <p>
            Preventive healthcare is not just about avoiding illness — it’s
            about early detection, timely action, and long-term well-being.
            Identifying health issues early can help avoid expensive hospital
            bills, reduce the burden of chronic diseases, and ensure a better
            quality of life. Prevention today means protection tomorrow.
          </p>
        </div>

        <div className="why-block">
          <h3>3. How Does PraanCare Help?</h3>
          <p>
            PraanCare offers a smart, simple, and accessible way to keep track
            of vital health metrics across cardiac, vision, mental, and sleep
            domains. Built for busy lives and aging needs, our platform empowers
            users to take control of their health through early warnings,
            personalized insights, and preventive action — all in one place.
          </p>
        </div>
      </div>

      <div className="features-section">
        <HealthTag
          image={heart}
          title="Cardiac Health"
          description="Monitor your heart health with real-time tracking of blood pressure, heart rate, and early warning signs of cardiac issues. Stay proactive and informed about your cardiovascular well-being with intelligent insights and alerts."
          style={{ "background-color": "#fd8072" }}
        />
        <HealthTag
          image={eye}
          title="Eye Health"
          description="Reduce digital eye strain by tracking vision stress, dryness, and screen exposure. Ideal for professionals and elders who spend long hours on screens. Maintain healthier eyes with easy self-monitoring and lifestyle suggestions."
          style={{ "background-color": "#adff96" }}
        />
        <HealthTag
          image={mental}
          title="Mental Health"
          description="Use evidence-based tools like DASS to assess symptoms of stress, anxiety, and depression. Our system helps you stay mentally balanced and encourages early support when emotional strain becomes a daily challenge."
          style={{ "background-color": "#61d5ff" }}
        />
        <HealthTag
          image={sleep}
          title="Sleep Disorder"
          description="Track your sleep quality, duration, and disturbances. Identify signs of insomnia, fatigue, or irregular cycles with guided insights that help you build better routines and achieve restful, energizing sleep every night."
          style={{ "background-color": "#ffdd81" }}
        />
      </div>

      <div className="demo-section">
        <h2>See PraanCare in Action</h2>
        <p>Watch how easy it is to track your health data using our app.</p>
        {/* <img src="/demo-placeholder.gif" alt="App demo animation" /> */}
      </div>

      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          {testimonials.map((t, index) => (
            <div className="testimonial-card" key={index}>
              <p>"{t.quote}"</p>
              <p className="testimonial-name">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
