import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post('https://backend-vo93.onrender.com/login', { username, email, password }) // Adjust the endpoint as needed
      .then((response) => {
        const { username, token, userId } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', username);
        localStorage.setItem('userId', userId);

        enqueueSnackbar('Login successful', { variant: 'success' });
        navigate('/home', { state: { username } });
      })
      .catch((error) => {
        enqueueSnackbar('Login failed', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="mx-4 my-4">Login</h1>

      <div className="my-4 mx-1">
        <label className="mx-3 my-4">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded"
          placeholder="Enter your username"
        />
      </div>

      <div className="my-4 mx-4">
        <label className="mx-4 my-4">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded "
          placeholder="Enter your email"
        />
      </div>

      <div className="my-4 mx-2">
        <label className="mx-3 my-4">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded"
          placeholder="Enter your password"
        />
      </div>

      <button
        className="btn btn-primary mx-4 my-2 p-2"
        style={{ width: 325 }}
        onClick={handleLogin}
      >
        Sign In
      </button>

      <div>
        <p className="mx-4">
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
