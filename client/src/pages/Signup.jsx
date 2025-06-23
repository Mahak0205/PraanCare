import { useState } from 'react';
import { signupUser } from '../auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const success = await signupUser({ email, password });
    if (success) navigate('/ProfileSetup');
  };

  return (
    <div className="page-container">
      <h2>Create a PraanCare Account</h2>
      <form onSubmit={handleSignup} className="form-box">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" /><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
