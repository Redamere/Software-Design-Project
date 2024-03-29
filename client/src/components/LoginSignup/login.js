import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './login.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import person from '../Assets/person.png';
import password_icon from '../Assets/password.png';

const Signup = () => {
    const [action, setAction] = useState('Login');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleToggleAction = () => {
        setAction(action === 'Sign Up' ? 'Login' : 'Sign Up');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (action === 'Login') {
            // Implement login functionality
            try {
                const response = await axios.post('/api/login', formData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            // Implement signup functionality
            try {
                const response = await axios.post('/api/signup', formData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
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
        </div>
    );
};

export default Signup;
