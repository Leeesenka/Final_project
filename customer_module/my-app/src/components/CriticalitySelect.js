import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const CriticalitySelect = ({ value, onChange }) => {
  const handleCriticalityChange = (event) => {
    const selectedCriticality = event.target.value;
    onChange(selectedCriticality);
  };

  return (
    <div className='criticality'>
      
      <select id="criticality" class="form-select form-select-lg mb-3" value={value} onChange={handleCriticalityChange}>
        <option value="">Select Criticality</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      {value === 'Low' && <span>Hours: 24 hours</span>}
      {value === 'Medium' && <span>Hours: 8 hours</span>}
      {value === 'High' && <span>Hours: 4 hours</span>}
    </div>
  );
};

export default CriticalitySelect;
