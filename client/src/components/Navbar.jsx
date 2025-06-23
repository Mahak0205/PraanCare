import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth';
import './Navbar.css';
import AnimatedLogo from '../components/AnimatedLogo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // removes JWT token
    navigate('/'); // redirect to homepage
  };

  return (
    <nav className="navbar">
      <section className="up">
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <AnimatedLogo />
        </div>
        <div className="contact">
          <p>Contact Us</p>
          <p><FontAwesomeIcon icon={faPhone} /> +91-1234567890</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> contact@praancare.in</p>
        </div>
      </section>

      <section className='down'>
        <div className="nav-links">
          <Link to="/">Home</Link>

          {isAuthenticated() ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/about">About</Link>
              <button onClick={handleLogout} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              <Link to="/about">About</Link>
            </>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
