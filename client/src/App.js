import React from 'react';
<<<<<<<<< Temporary merge branch 1
// import LoginPage from './components/loginPage/login';
import SignupPage from './components/signupPage/signup';
=========
import LoginPage from './components/loginPage/login';
// import SignupPage from './components/signupPage/signup';
>>>>>>>>> Temporary merge branch 2

const App = () => {
  return (
    <div>
<<<<<<<<< Temporary merge branch 1
      <SignupPage/>
=========
      <LoginPage />
>>>>>>>>> Temporary merge branch 2
    </div>
  );
};

export default App;
