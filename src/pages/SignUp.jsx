import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = () => {
    if (!username || !email || !password) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }

    axios
      .post('http://localhost:5001/signup', { username, email, password }) // Replace with actual API URL
      .then(() => {
        enqueueSnackbar('Sign Up successful!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Sign Up failed. Please try again.', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="mx-4 my-4">Sign Up</h1>
      <div className="p-4">
        <div className=" mx-2">
          <label className="mx-2 my-3">Username :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-full"
            placeholder="Enter your username"
          />
        </div>
        <div className="my-3 mx-4">
          <label className="mx-3 my-4">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="my-4">
          <label className="mx-3 my-2">Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-full"
            placeholder="Enter your password"
          />
        </div>
        <button
          className="btn btn-primary mx-4 my-4 p-2"
          style={{ width: '300px' }}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <div className="mt-4">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
