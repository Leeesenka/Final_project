import React, { useEffect, useState } from 'react';


const LastUsername = ({ onUsernameChange }) => {
  const [lastUsername, setLastUsername] = useState('');

  useEffect(() => {
    getLastUsername();
  }, []);

  const getLastUsername = async () => {
    try {
      const response = await fetch('http://localhost:3030/last_login');
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
