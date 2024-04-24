// SignUp.js
import React from 'react';
import { useState } from 'react'
import './signup.css';

const SignUp = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if confirmPassword matches password
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        const url = '/api/signup';
        const formData = { username, password }; // Define formData here
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
    
            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                console.log(json.message);
                // Clear form fields after successful signup
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                console.log('Signup Successful');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.error || 'An error occurred');
        }
    };
    

    return (

        <div className="sign-in-container">
            <h1>Welcome! Let’s introduce ourselves. 🤝</h1>

            <div className="signup-container">
                <div className="rectangle left-rectangle"></div>
                <p className="or-text"> sign up below</p>
                <div className="rectangle right-rectangle"></div>
            </div>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    id="username"
                    placeholder="Enter your username" />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="password"
                    placeholder="Enter your password" />
            </div>

            <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    id="confirmPassword"
                    placeholder="Enter your password" />
            </div>

            <button className="register-btn" onClick={handleSubmit}>Register</button>
            <button className="existing-account-text" onClick={() => { window.location.href = '/login'; }}>I have an account</button>
            {error  && <div className="error">{error}</div>}
        </div>
    );
};

export default SignUp;