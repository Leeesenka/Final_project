import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const BASE_URL = process.env.REACT_APP_BASE_URL
const SubjectChart = () => {
  const [tickets, setTickets] = useState([]);

  // Объект-словарь для коротких названий
  const shortNames = {
    "Hard drive issues: crashes, file system corruption, bad sectors, etc.": "Hard drive issues",
    "Memory problems: read/write errors, incorrect module recognition.": "Memory problems",
    "Processor malfunctions: overheating, performance instability, crashes.": "Processor malfunctions",
    "Motherboard failures: port malfunctions, incorrect device detection, power component issues.": "Motherboard failures",
    "Graphics card problems: artifacts on the screen, incorrect display output, failures.": "Graphics card problems"
    // Добавьте здесь больше сопоставлений по мере необходимости
  }

  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = async () => {
    try {
      const response = await fetch(BASE_URL+'/all_tickets');
      const data = await response.json();

      if (data && data.length > 0) {
        setTickets(data);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  if (!tickets || tickets.length === 0) {
    return <div>No tickets data available.</div>;
  }

  const subjects = {};

  tickets.forEach((ticket) => {
    // Ищем соответствующее короткое имя, если оно есть в словаре.
    const matchingShortNameKey = Object.keys(shortNames).find(key => ticket.subject.includes(key));
    const name = matchingShortNameKey ? shortNames[matchingShortNameKey] : ticket.subject;
  
    if (subjects[name]) {
      subjects[name] += 1;
    } else {
      subjects[name] = 1;
    }
  });
  

  const chartData = Object.keys(subjects).map((subject) => ({
    name: subject,
    value: subjects[subject],
  }));

  return (
    
    <ResponsiveContainer width="70%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SubjectChart;
