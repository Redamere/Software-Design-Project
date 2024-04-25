import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.svg'; // Import the logo.svg file

import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const userIdCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('userId='));
    setUser(!!userIdCookie);
  }, []);

  const logout = () => {
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser(false); // Assuming setUser is a function to update user state

    // Redirect to the home page
    window.location.href = '/';
  };
  

  return (
    <header className="main-header">

      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        {/* <span className="title">Your Title Here</span> */}
      </div>

      {user && (
      <div className="nav-buttons">
        <Link to="/quoteForm" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
          <button className="nav-button">Add a Quote</button>
        </Link>
        <Link to="/history" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
          <button className="nav-button">Quote History</button>
        </Link>
      </div>
      )}

      {user && (
        <div className="auth-buttons">
          <button onClick={logout} className="nav-button">Log Out</button>
          <Link to="/editProfile" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
            <button className="signin-button">My Profile</button>
          </Link>
        </div>
      )}

      {!user && (
        <div className="auth-buttons">
          <Link to="/login" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
            <button className="login-button">Log In</button>
          </Link>
          <Link to="/signup" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
            <button className="signin-button">Get Started</button>
          </Link>
        </div>
      )}

    </header>
  );
};

export default Navbar;
