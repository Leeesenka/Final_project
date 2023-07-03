import React, { useState } from 'react';

const HoursSelect = ({ value, onChange }) => {
  const [clientHours, setClientHours] = useState('');

  const handleClientChange = (event) => {
    const selectedClient = event.target.value;
    setClientHours(getClientHours(selectedClient));
    onChange(getClientHours(selectedClient));
  };

  const getClientHours = (client) => {
    switch (client) {
      case 'Low':
        return '24 hours';
      case 'Medium':
        return '8 hours';
      case 'High':
        return '4 hours';
      default:
        return '';
    }
  };

  return (
    <div>
      <label htmlFor="client">Client:</label>
      <select id="client" value={value} onChange={handleClientChange}>
        <option value="">Select Client</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <span>Hours: {clientHours}</span>
    </div>
  );
};

export default HoursSelect;
