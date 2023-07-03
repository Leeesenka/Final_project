import React from 'react';

const SendTicket = ({ ticketData, additionalInformation, selectedEngineer, clientAddress}) => {
  const handleSendData = async () => {
    try {
      const { id, subject, created_at, client, equipment_name, serial_number, criticality_name, hours, description, engineer } = ticketData;

      const data = {
        id,
        subject,
        created_at,
        client,
        address: clientAddress, 
        equipment_name,
        serial_number,
        criticality_name,
        hours,
        description,
        engineer,
        additional_information: additionalInformation,
        chat_id: selectedEngineer,
      };

      console.log("bot", data);

      const response = await fetch('http://localhost:8080/send-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data successfully sent!');
        alert('Data successfully sent!');
      } else {
        console.error('Error sending data:', response.status);
        alert('Error sending data!');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Error sending data!');
    }
  };

  return (
    <button class="btn btn-primary" onClick={handleSendData}>Send Data</button>
  );
};

export default SendTicket;
