import React, { useEffect, useState } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL
const LastUsername = ({ onUsernameChange }) => {
  const [lastUsername, setLastUsername] = useState('');

  useEffect(() => {
    getLastUsername();
  }, []);

  const getLastUsername = async () => {
    try {
      const response = await fetch(BASE_URL+'/last_login');
      const data = await response.json();

      if (data.username) {
        setLastUsername(data.username);
        onUsernameChange(data.username);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="username">{lastUsername}</div>
  );
};

export default LastUsername;
