import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Plot from 'react-plotly.js';

const EngineerLoad = () => {
  const [engineers, setEngineers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getEngineers();
    getAllTickets();
  }, []);

  const getEngineers = async () => {
    try {
      const response = await fetch('http://localhost:3030/engineers');
      const data = await response.json();
      console.log('all engineers', data)
      if (data && data.length > 0) {
        setEngineers(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllTickets = async () => {
    try {
      const response = await fetch('http://localhost:3030/all_tickets');
      const data = await response.json();

      if (data && data.length > 0) {
        setTickets(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getEngineerData = (engineer) => {
    const engineerTickets = tickets.filter(ticket => 
      new Date(ticket.start_date) <= date &&
      new Date(ticket.completion_date) >= date &&
      ticket.engineer_id === engineer.id // replace 'engineer.id' with correct property
    );
 
    return engineerTickets.map(ticket => {
      const start = new Date(ticket.start_date);
      const end = new Date(ticket.completion_date);
   
      return {start: start, end: end};
    });
    
  };


  const data = engineers.map(engineer => {
    const tasks = getEngineerData(engineer);

    return {
      name: engineer.name,
      y: tasks.map((_, i) => engineer.name),
      x: tasks.map(task => [task.start, task.end]),
      type: 'bar',
      mode: 'stack',
      orientation: 'h',
    };
  });


  return (
    <div>
      <h1>Engineer Load</h1>
      <DatePicker selected={date} onChange={date => setDate(date)} />
      <Plot
        data={data}
        layout={{barmode: 'stack'}}
      />
    </div>
  );
};

export default EngineerLoad;
