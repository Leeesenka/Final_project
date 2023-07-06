import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const handleLogin = () => {
    const userData = {
      username,
      password,
    };
  
    const queryParams = new URLSearchParams();
    queryParams.append('username', username);
  
    fetch(`http://localhost:3030/login?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response:', data);
        const { ok, data: responseData } = data; // Destructure the data from the response
        if (ok) {
          const loggedInUsername = responseData.username; // Get the username from the data
          console.log('LoggedInUsername:', loggedInUsername); // Log the username to the console
          // Perform actions after successful login
          navigate(`/client_table?username=${loggedInUsername}`);
        } else {
          const errorMsg = responseData.message || 'Login failed';
          console.error('Error:', errorMsg);
          // Handle login error
          setError(errorMsg);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle request error
        setError('An error occurred');
      });
  };

  const handlePasswordFocus = () => {
    setPasswordIsFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordIsFocused(false);
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display the error alert if there is an error */}
      <form>
        <div className="row">
          {/* <label htmlFor="username" className="col-sm-2 col-form-label col-form-label-lg">Username</label> */}
          <div className="col-sm-10">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="row">
          {/* <label htmlFor="password" className="col-sm-2 col-form-label col-form-label-lg">Password</label> */}
          <div className="col-sm-10">
            <input
              type="password"
              id="password"
              value={password}
              className={`form-control form-control-lg ${passwordIsFocused ? 'password-focused' : ''}`}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <button type="button" id='button-login'  onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
  }  
export default Login;
