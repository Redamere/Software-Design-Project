import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './login.css';
import person from '../Assets/person.png';
import password_icon from '../Assets/password.png';

const Signup = () => {
    const [action, setAction] = useState('Login');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = action === 'Login' ? '/api/login' : '/api/signup';
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
                if (action === 'Login') {
                    // Redirect to client-profile-management upon successful login
                    window.location.href = '/profile';
                    console.log('Login Successful');
                }
                if (action === 'Sign Up') {
                    // Clear form fields after successful signup
                    setFormData({ username: '', password: '', confirmPassword: '' });
                    console.log('Signup Successful');
                    window.location.href = '/login';
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    const handleToggleAction = () => {
        setAction(action === 'Sign Up' ? 'Login' : 'Sign Up');
        setError(null); // Clear any previous errors when switching action
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className="underline"></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={person} alt='person' />
                    <input type='text' name='username' placeholder='Username' onChange={handleChange} />
                </div>
                <div className ='input'>
                    <img src={password_icon} alt="password"/>
                    <input type='password' name='password' placeholder='Password' onChange={handleChange} />
                </div>
                {action === 'Sign Up' && (
                    <div className ='input'>
                        <img src={password_icon} alt="password"/>
                        <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} />
                    </div>
                )}
            </div>
            <div className="forgot-password">
                {action === 'Login' ? "Not a member? " : "Already a member? "}
                <span onClick={handleToggleAction}>
                    {action === 'Login' ? "Sign Up" : "Login"}
                </span>
            </div>
            <div className='submit-container'>
                <button className='submit' onClick={handleSubmit}>{action}</button>
            </div>
            {error && <div className="error-message">{error}</div>} {/* Display error message if present */}
        </div>
    );
};

export default Signup;
