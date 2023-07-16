import React, { useState } from 'react';

const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const handleRegister = () => {
    const userData = {
    first_name,
    last_name,
    email,
    username,
    password,
    };

    fetch(BASE_URL+'/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registration successful:', data);
        // Действия после успешной регистрации
      })
      .catch((error) => {
        console.error('Error:', error);
        // Обработка ошибки регистрации
      });
  };

  return (
    <div>
      <div className='register-new'>
        
        <form id='register-form'>
          <div className="mb-3">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              class="form-control" 
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              class="form-control" 
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="form-control" 
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username">Company name:</label>
            <input
              type="text"
              id="username-register"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              class="form-control" 
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password-register"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="form-control" 
            />
          </div>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
