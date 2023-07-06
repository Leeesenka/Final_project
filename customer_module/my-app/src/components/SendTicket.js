import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SendTicket = ({ ticketData, additionalInformation, clientAddress, engineerDetails, onEngineerDetailsChange, selectedEngineer }) => {
  const navigate = useNavigate(); 
   const [engineers, setEngineers] = useState([]);

console.log("address",clientAddress)
  useEffect(()=>{
    const getEngineers = async () => {
      try {
        const response = await fetch('http://localhost:3030/engineers');
        const data = await response.json();
        console.log('all engineers', data)
        if (data && data.length > 0) {
          setEngineers(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getEngineers()
  },[])
console.log('engineerDetails', engineerDetails)
  const handleSendData = async () => {
    try {
      const { id, subject, created_at, client, equipment_name, serial_number, criticality_name, hours, description } = ticketData;
      
      let chatId = null;
      console.log(engineers)
      console.log(selectedEngineer)
      if (engineers) {
        const engineer = engineers.find((engineer) => engineer.id == selectedEngineer);
        console.log(engineer)
        chatId = engineer ? engineer.chat_id : null;
      }

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
        engineer: selectedEngineer,
        additional_information: additionalInformation,
        chat_id: chatId
      };

      console.log(data)
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
        navigate('/ticket_table'); 
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
    <button id="sendButton" onClick={handleSendData}>Send Data</button>
  );
};

export default SendTicket;
