import React from 'react';
import LoginSignup from './components/LoginSignup/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {userState} from 'react';

const App = () => {
  return (
    <div>
      <LoginSignup />
    </div>
  );
};

export default App;
