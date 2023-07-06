import React from 'react';

const TicketRow = ({ ticket, openDescription }) => {
    
    const isCompleted = !!ticket.completion_date;
    const isPending = ticket.start_date && !ticket.completion_date;
    const isEngineerNameEmpty = ticket.engineer_name && !ticket.start_date && !ticket.completion_date;
  
    const rowStyle = {
      backgroundColor: isCompleted ? '#CCFFFF' : isPending ? '#FFFFCC' : isEngineerNameEmpty ? '#ADDFFF' : 'inherit',
      color: isCompleted || isPending ? 'black' : 'inherit',
    };

  return (
    <tr key={ticket.id} onClick={() => openDescription(ticket.id, ticket.engineer)} style={rowStyle}>
      <td>{ticket.id}</td>
      <td>{ticket.client}</td>
      <td>{ticket.created_at}</td>
      <td>{ticket.subject}</td>
      <td>{ticket.equipment_name}</td>
      <td>{ticket.criticality_name}</td>
      <td>{ticket.engineer_name}</td>
      <td>{ticket.date_of_change}</td>
      <td>{ticket.start_date}</td>
      <td>{ticket.completion_date}</td>
    </tr>
  );
};

export default TicketRow;
