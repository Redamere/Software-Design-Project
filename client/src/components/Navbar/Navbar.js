import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.svg'; // Import the logo.svg file

import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(false);

  const handleClick = () => {
    logout()
  };

  useEffect(() => {
    // Check if the userId cookie exists
    const userIdCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('userId='));
    // Set the user state based on the existence of the userId cookie
    setUser(!!userIdCookie);
  }, []);

  return (
    <header className="main-header">

      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        {/* <span className="title">Your Title Here</span> */}
      </div>

      <div className="nav-buttons">
        <Link to="/form" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
          <button className="nav-button">Add a Quote</button>
        </Link>
        <Link to="/history" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
          <button className="nav-button">Quote History</button>
        </Link>
      </div>

      {user && (
        <div className="auth-buttons">
          <Link to="/profile" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
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


// import { Link } from 'react-router-dom'
// import './Navbar.css'

// export default function Navbar() {
//     return <nav className="nav">
//         <a href="/" className="site-title">Site Name</a>
//         <ul>
//             <li><a href="/form">Quote Form</a></li>
//             <li><a href="/history">Quote History</a></li>
//             <li><a href="/profile">Profile</a></li>
//             <li><a href="/login">Login</a></li>
//         </ul>
//     </nav>
// }
