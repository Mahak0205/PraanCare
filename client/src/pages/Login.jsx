import { useState } from 'react';
import { loginUser } from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser({ email, password });
    if (success) navigate('/dashboard');
  };

  return (
    <div className="page-container">
      <h2>Login to PraanCare</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" /><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
