import cardiacImg from "../assets/dashboard/Heart.png";
import eyeImg from "../assets/dashboard/Eye.png";
import mental_health_hImg from "../assets/dashboard/Mental.png";
import sleepImg from "../assets/dashboard/Sleep.png";

import img1 from '../assets/slider/1.jpg';
import img2 from '../assets/slider/2.jpg';
import img3 from '../assets/slider/3.jpg';
import img4 from '../assets/slider/4.jpg';
import img5 from '../assets/slider/5.jpg';

import { useNavigate } from 'react-router-dom';
import './Dashboard.css';



const Dashboard = () => {
  const navigate = useNavigate();

  return (
    
    <div className="dashboard-container">
        
      <section className="intro-container">
        <h2>Health Dashboard</h2>
        <div className="image-scroller">
            <div className="image-track">
                <img src={img1} alt="intro" />
                <img src={img2} alt="intro" />
                <img src={img3} alt="intro" />
                <img src={img4} alt="intro" />
                <img src={img5} alt="intro" />
                <img src={img1} alt="intro" />
                <img src={img2} alt="intro" />
                <img src={img3} alt="intro" />
                <img src={img4} alt="intro" />
                <img src={img5} alt="intro" />
            </div>
        </div>
        <p>Select a health category to monitor:</p>
      </section>

      {/* ----------------------------------------------- */}

      <section className="health-tags">

        <div className="cardiac tag" onClick={() => navigate('/cardiac')} style={{ cursor: 'pointer' }}>
            <div id="up">
                <img id="health-img" src={cardiacImg} alt="heart" />
                <h3>Heart</h3>
            </div>
            <div id='down'>
                <p>Measure your cardiac health</p>
                <button onClick={() => navigate('/cardiac')}>Measure</button>
            </div>
        </div>

        <div className="eye tag" onClick={() => navigate('/eye')} style={{ cursor: 'pointer' }}>
            <div id="up">
                <img id="health-img" src={eyeImg} alt="eye" />
                <h3>Eye</h3>
            </div>
            <div id='down'>
                <p>Measure your eye health</p>
                <button onClick={() => navigate('/eye')}>Measure</button>
            </div>
        </div>

        <div className="stress tag" onClick={() => navigate('/mental')} style={{ cursor: 'pointer' }}>
            <div id="up">
                <img id="health-img" src={mental_health_hImg} alt="stress" />
                <h3>Mental Wellbeing</h3>
            </div>
            <div id='down'>
                <p>Check your mental wellbeing</p>
                <button onClick={() => navigate('/mental')}>Measure</button>
            </div>
        </div>

        <div className="sleep tag" onClick={() => navigate('/sleep')} style={{ cursor: 'pointer' }}>
            <div id="up">
                <img id="health-img" src={sleepImg} alt="sleep" />
                <h3>Sleep</h3>
            </div>
            <div id='down'>
                <p>Identify any sleep disorders</p>
                <button onClick={() => navigate('/sleep')}>Measure</button>
            </div>
        </div>
        
      </section>
    </div>
  );
};

export default Dashboard;
