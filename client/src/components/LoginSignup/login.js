import React, {useState} from 'react'
import './login.css'

import person from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';


 const Signup = () => {
 const[action,setAction] = useState('Login')

 const handleToggleAction = () => {
  setAction(action === 'Sign Up' ? 'Login' : 'Sign Up');
};

document.body.classList.add('signup-page');


  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className="underline"></div>
      </div>
      <div className='inputs'>
    <div className='input'>
        <img src={person} alt='person'/>
        <input type='text' placeholder='Username'/>
    </div>
      <div className ='input'>
        <img src={password_icon} alt="password"/>
        <input type='password' placeholder='Password'/>
      </div>
      {action === 'Sign Up' && (
          <div className ='input'>
            <img src={password_icon} alt="password"/>
            <input type='password' placeholder='Confirm Password'/>
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
         {action === 'Sign Up' && (
          <div className='submit' onClick={() => { setAction('Sign Up') }}>Sign Up</div>
        )}
        {action === 'Login' && (
          <div className='submit' onClick={() => { setAction('Login') }}>Login</div>
        )}
    </div>
    </div>

 

  )
}
export default Signup;
