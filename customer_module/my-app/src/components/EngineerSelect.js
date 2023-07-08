import React, { useEffect, useState, useContext} from 'react';
// import { useParams } from 'react-router';
import { TicketContext } from './Description';

const EngineerSelect = ({ engineers, engineer_name, onEngineerChange }) => {
  // const params = useParams()
  const {setSelectedEngineer,selectedEngineer} = useContext(TicketContext)
  // const urlParams = new URLSearchParams(window.location.search);
  // const name = urlParams.get('engineer');
  // console.log('xxxxxxx',name);
  // selectedEngineer = name
  const handleEngineerChange = (event) => {
    const selectedEngineer = event.target.value;
    console.log('yyyyyy',selectedEngineer)
    // onEngineerChange(selectedEngineer);
    setSelectedEngineer(selectedEngineer)
  };

  return (
    <select
      id="engineer"
      className="form-select"
      aria-label="Default select example"
      value={selectedEngineer}
      onChange={handleEngineerChange}
    >
      <option value="">Choose an engineer</option>
      {engineers && Array.isArray(engineers) && engineers.map((engineer) => (
        <option key={engineer.id} value={engineer.id}>{engineer.name}</option>
      ))}
    </select>
  );
  
};

export default EngineerSelect