import React, { useState } from 'react';
import './login.css';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/api/login';
    const formData = { username, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
      } else {
        setError(null);
        console.log(json.message);

        // Store the user ID in a cookie
        document.cookie = `userId=${json._id};path=/`; // Set cookie named 'userId' with the value of json._id
        console.log('Login Successful');
        
        // Redirect to client-profile-management upon successful login
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="sign-in-container">
      <h1>Glad to have you back! 🥳</h1>
      <h2>Who are you again?</h2>

      <div className="signup-container">
        <div className="rectangle left-rectangle"></div>
        <p className="or-text"> log in below</p>
        <div className="rectangle right-rectangle"></div>
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="username"
          placeholder="Enter your username address"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          placeholder="Enter your password"
        />
      </div>

      <button className="register-btn" onClick={handleSubmit}>
        Log In
      </button>

      <button
        className="existing-account-text"
        onClick={() => {
          window.location.href = '/signup';
        }}
      >
        Create an account
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LogIn;
