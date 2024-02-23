import React, {useState} from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };
  return (
    <div>
      <h1>Hello World</h1>

    </div>
  );
};

export default Login;
