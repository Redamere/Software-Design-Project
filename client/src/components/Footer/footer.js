import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../Assets/logo.svg';
import './footer.css';


const GITHUB = {
  IVY: 'https://github.com/Huynh07',
  ANDREW: 'https://github.com/andrewdieu',
  CHINEDU: 'https://github.com/Matrix1463',
  SEAN: 'https://github.com/Redamere'
};

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>
        <div className="font-inter">
          Built and Designed by{' '}
          <span className="font-medium">
            <Link to={GITHUB.IVY} >Ivy Doan</Link>
          </span>
          {', '}
          <span className="font-medium">
            <Link to={GITHUB.SEAN}>Sean Paolo Banza</Link>
          </span>
          {', '}
          <span className="font-medium">
            <Link to={GITHUB.ANDREW} >Andrew Dieu</Link>
          </span>
          {', and '}
          <span className="font-medium">
            <Link to={GITHUB.CHINEDU} >Chinedu Okafor</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Footer;