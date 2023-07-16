import React, { useEffect, useState } from 'react';
import EngineerDetails from './EngineerDetails';
import EngineerSelect from './EngineerSelect';
const BASE_URL = process.env.REACT_APP_BASE_URL
const Engineers = ({ onEngineerChange }) => {
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState('');
 
  useEffect(() => {
    getEngineers();
  }, []);

  const getEngineers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/engineers`);
      const data = await response.json();
      console.log('all engineers', data)
      if (data && data.length > 0) {
        setEngineers(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <EngineerSelect
        engineers={engineers}
        engineer_name={selectedEngineer}
        selectedEngineer={selectedEngineer}
        onEngineerChange={onEngineerChange}
      />
      <EngineerDetails
        engineers={engineers}
        selectedEngineer={selectedEngineer}
        onEngineerChange={onEngineerChange}
      />
    </div>
  );
};

export default Engineers;
