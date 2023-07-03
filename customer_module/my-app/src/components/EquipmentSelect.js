import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const EquipmentSelect = ({ value, onChange, onSerialNumberChange }) => {
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    getEquipmentList();
  }, []);

  const getEquipmentList = async () => {
    try {
      const response = await fetch('http://localhost:3030/equipment');
      const data = await response.json();

      if (data && data.length > 0) {
        setEquipmentList(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEquipmentChange = (selectedEquipment) => {
    onChange(selectedEquipment);
    const equipment = equipmentList.find((item) => item.name === selectedEquipment);
    if (equipment) {
      onSerialNumberChange(equipment.serial_number);
    } else {
      onSerialNumberChange('');
    }
  };

  return (
    <select id="equipment" class="form-select form-select-lg mb-3" value={value} onChange={(e) => handleEquipmentChange(e.target.value)}>
      <option value="">Select Equipment</option>
      {equipmentList.map((equipment) => (
        <option key={equipment.id} value={equipment.name}>{equipment.name}</option>
      ))}
    </select>
  );
};

export default EquipmentSelect;
