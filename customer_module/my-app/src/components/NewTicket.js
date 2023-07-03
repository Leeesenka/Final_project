import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form } from 'react-bootstrap';
import SubjectSelect from './SubjectSelect';
import EquipmentSelect from './EquipmentSelect';
import CriticalitySelect from './CriticalitySelect';
import LastUsername from './LastUsername';
import SerialNumberSelect from './SerialNumberSelect';
import HoursSelect from './HoursSelect';
import './NewTicket.css';

const NewTicketForm = () => {
  const [client, setClient] = useState('');
  const [subject, setSubject] = useState('');
  const [equipment, setEquipment] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [criticality, setCriticality] = useState('');
  const [hoursCriticality, setHoursCriticality] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const handleLastUsernameChange = (username) => {
    setClient(username);
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    let criticalityName;
    let hoursValue;
    if (criticality === '24 hours') {
      criticalityName = 'Low';
      hoursValue = '24 hours';
    } else if (criticality === '4 hours') {
      criticalityName = 'High';
      hoursValue = '4 hours';
    } else {
      criticalityName = 'Medium';
      hoursValue = '8 hours';
    }

    // Assign user_id based on the client value
    let userId;
    if (client === 'Anna') {
      userId = 28;
    } else if (client === 'Tom') {
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
      const response = await fetch('http://localhost:3030/newticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Ticket successfully created!');
        alert('Ticket successfully created!');
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
    <div className='main'>
    <Form id="new" onSubmit={handleFormSubmit}>
      <Form.Group controlId="client">
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
      <Button variant="primary" type="submit" id="create-button">
        Create Ticket
      </Button>
    </Form>
    </div>
    </div>
  );
};

export default NewTicketForm;
