import React, { useEffect, useState } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL
const SerialNumberSelect = ({ equipment, onSerialNumberChange }) => {
  const [serialNumber, setSerialNumber] = useState('');

  useEffect(() => {
    if (equipment) {
      fetchEquipment();
    } else {
      setSerialNumber('');
      onSerialNumberChange('');
    }
  }, [equipment]);

  const fetchEquipment = async () => {
    try {
      const response = await fetch(BASE_URL+'/equipment');
      const data = await response.json();

      const selectedEquipment = data.find(item => item.name === equipment);

      if (selectedEquipment) {
        setSerialNumber(selectedEquipment.serial_number);
        onSerialNumberChange(selectedEquipment.serial_number);
      } else {
        setSerialNumber('');
        onSerialNumberChange('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='serial-number'>
      {/* <label htmlFor="equipment">Equipment:</label>
      <select id="equipment" value={equipment} onChange={(e) => onSerialNumberChange(e.target.value)}>
        <option value="">Select Equipment</option>
        <option value="Laptop">Laptop</option>
        <option value="Desktop computer">Desktop computer</option>
        <option value="Server">Server</option>
        <option value="Router">Router</option>
        <option value="Switch">Switch</option>
        <option value="Printer">Printer</option>
        <option value="Scanner">Scanner</option>
      </select> */}
      <span>Serial Number: {serialNumber}</span>
    </div>
  );
};

export default SerialNumberSelect;
