import React, { useEffect, useState } from 'react';

const ClientAddress = ({ userId }) => {
  const [clientAddress, setClientAddress] = useState('');

  useEffect(() => {
    const fetchClientAddress = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3030/client_adress/${userId}`);
        const data = await response.json();

        if (data && data.length > 0 && data[0].address) {
          setClientAddress(data[0].address);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClientAddress();
  }, [userId]);

  return <input type="text" value={clientAddress} readOnly />;
};

export default ClientAddress;
