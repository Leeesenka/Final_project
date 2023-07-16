import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import SubjectSelect from './SubjectSelect';
import EquipmentSelect from './EquipmentSelect';
import CriticalitySelect from './CriticalitySelect';
import LastUsername from './LastUsername';
import SerialNumberSelect from './SerialNumberSelect';
import './NewTicket.css';
const BASE_URL = process.env.REACT_APP_BASE_URL
const NewTicketForm = () => {
  const [client, setClient] = useState('');
  const [subject, setSubject] = useState('');
  const [equipment, setEquipment] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [criticality, setCriticality] = useState('');
  const [hoursCriticality, setHoursCriticality] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLastUsernameChange = (username) => {
    setClient(username);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let criticalityName;
    let hoursValue;
    if (criticality.includes('Low')) {
      criticalityName = 'Low';
      hoursValue = '24 hours';
    } else if (criticality.includes('High')) {
      criticalityName = 'High';
      hoursValue = '4 hours';
    } else {
      criticalityName = 'Medium';
      hoursValue = '8 hours';
    }
    
    

    // Assign user_id based on the client value
    let userId;
    if (client === 'ALD Group') {
      userId = 28;
    } else if (client === 'TLVTech') {
      userId = 25;
    } else {
      userId = null; // Handle other client values as needed
    }

    const data = {
      client: client,
      subject: subject,
      equipment_name: equipment,
      serial_number: serialNumber,
      criticality_name: criticalityName,
      hours: hoursValue,
      description: description,
      user_id: userId // Add the user_id field
    };
    console.log('Data to be sent:', data);

    try {
      const response = await fetch(BASE_URL +'/newticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Ticket successfully created!');
        alert('Ticket successfully created!');

        // Параметр username для передачи на страницу ClientTable
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('username', client);

        // Переход на страницу ClientTable с параметром username
        navigate(`/client_table?${searchParams.toString()}`);

        resetForm();
      } else {
        console.error('Error creating ticket:', response.status);
        alert('Error creating ticket!');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Error sending data!');
    }
  };

  const resetForm = () => {
    setClient('');
    setSubject('');
    setEquipment('');
    setSerialNumber('');
    setCriticality('');
    setHours('');
    setDescription('');
  };

  return (
    <div className='all'>
      <div className='main-new-ticket'>
        <img src='https://www.globalresponse.com/wp-content/uploads/2022/04/gr-home-sq.png'></img>
        <div className='fhoto-people'>
        <Form id="new" onSubmit={handleFormSubmit}>
          <Form.Group controlId="client" id='client-name'>
            <Form.Label>Client:</Form.Label>
            <LastUsername onUsernameChange={handleLastUsernameChange} />
          </Form.Group>

          <SubjectSelect value={subject} onChange={setSubject} />
          <EquipmentSelect value={equipment} onChange={setEquipment} onSerialNumberChange={setSerialNumber} />

          <SerialNumberSelect equipment={equipment} onSerialNumberChange={setSerialNumber} />

          <CriticalitySelect value={criticality} onChange={setCriticality} onHoursCriticalityChange={setHoursCriticality} />

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Button variant="primary"  type="submit" id="create-button">
            Create Ticket
          </Button>
        </Form>
        </div>
      </div>
    </div>
  );
};

export default NewTicketForm;
