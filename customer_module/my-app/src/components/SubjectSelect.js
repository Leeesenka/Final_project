import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
const BASE_URL = process.env.REACT_APP_BASE_URL
const SubjectSelect = ({ value, onChange }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    try {
      const response = await fetch(BASE_URL+'/subject');
      const data = await response.json();

      if (data && data.length > 0) {
        setSubjects(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <select id="subject" class="form-select form-select-lg mb-3" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Subject</option>
      {subjects.map((subject) => (
        <option key={subject.id} value={subject.name}>{subject.name}</option>
      ))}
    </select>
  );
};

export default SubjectSelect;
