import { jwtDecode } from 'jwt-decode'; // ✅ Correct

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // ✅ Works now
    return decoded.id || decoded._id || decoded.user?._id || null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    return true;
  } else {
    alert(data.msg);
    return false;
  }
};

export const signupUser = async ({ email, password }) => {
  const res = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    return true;
  } else {
    alert(data.msg);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
