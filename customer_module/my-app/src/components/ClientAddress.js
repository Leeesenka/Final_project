import React, { useEffect, useState } from 'react';
const BASE_URL = process.env.REACT_APP_BASE_URL
const ClientAddress = ({ userId }) => {
  const [clientAddress, setClientAddress] = useState('');

  useEffect(() => {
    const fetchClientAddress = async () => {
      try {
        const response = await fetch(`${BASE_URL}/client_adress/${userId}`);
        const data = await response.json();

        if (data && data.length > 0 && data[0].address) {
          setClientAddress(data[0].address);
        }
        console.log('eeee', data[0].address)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClientAddress();
  }, [userId]);

  return <div>{clientAddress}  </div>;
  
};

export default ClientAddress;
