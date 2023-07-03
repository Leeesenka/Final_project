import React, { useEffect, useState } from 'react';
const EngineerDetails = ({ engineers, selectedEngineer, onEngineerChange }) => {
    const [engineerDetails, setEngineerDetails] = useState(null);
  
    useEffect(() => {
      const selectedEngineerData = engineers.find((engineer) => engineer.name === selectedEngineer);
      setEngineerDetails(selectedEngineerData);
      onEngineerChange(selectedEngineerData ? selectedEngineerData.chat_id : '');
    }, [engineers, selectedEngineer, onEngineerChange]);
  
    if (!engineerDetails) {
      return null;
    }
  
    return (
      <div>
        <p>Name: {engineerDetails.name}</p>
        <p>Specialization: {engineerDetails.specialization}</p>
        <p>Contact Number: {engineerDetails.contact_number}</p>
        <p>Email: {engineerDetails.email}</p>
        <p>Department: {engineerDetails.department}</p>
        <p>Chat ID: {engineerDetails.chat_id}</p>
      </div>
    );
  };
export default EngineerDetails  