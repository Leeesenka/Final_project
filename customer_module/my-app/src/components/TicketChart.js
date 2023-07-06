import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TicketChart = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = async () => {
    try {
      const response = await fetch('http://localhost:3030/all_tickets');
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

  // Создаем объект для подсчета количества тикетов для каждого клиента
  const clients = {};

  // Подсчитываем количество тикетов для каждого клиента
  tickets.forEach((ticket) => {
    if (clients[ticket.client]) {
      clients[ticket.client] += 1;
    } else {
      clients[ticket.client] = 1;
    }
  });

  // Преобразуем данные в формат, подходящий для диаграммы
  const chartData = Object.keys(clients).map((client) => ({
    name: client,
    value: clients[client],
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#ff0000'];

  return (
    <div className="ticket-chart" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginRight: '100px' }}>
      <div className='diagr' style={{ width: '500px' }}>
        <h2>Total number of customer requests</h2>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="legend">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center'}} className='111'>
            <span className="legend-color" style={{ backgroundColor: colors[index % colors.length], width: '15px', height: '15px', marginRight: '5px' }}></span>
            <span className="legend-label">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketChart;
