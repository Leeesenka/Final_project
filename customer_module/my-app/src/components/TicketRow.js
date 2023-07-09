import React from 'react';
// import moment from 'moment';
import moment from 'moment-timezone';

const TicketRow = ({ ticket, openDescription }) => {
  const createdAtFormatted = moment(ticket.created_at).add(3, 'hours').format('YYYY-MM-DD HH:mm');

  const dateOfChangeFormatted = ticket.date_of_change ? moment(ticket.date_of_change).subtract(3, 'hours').format('DD MMMM YYYY, HH:mm') : '';

  const startDateFormatted = ticket.start_date ? moment(ticket.start_date).format('DD MMMM YYYY, HH:mm') : '';
  const completionDateFormatted = ticket.completion_date ? moment(ticket.completion_date).format('DD MMMM YYYY, HH:mm') : '';

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
      <td>{createdAtFormatted}</td>
      <td>{ticket.subject}</td>
      <td>{ticket.equipment_name}</td>
      <td>{ticket.criticality_name}</td>
      <td>{ticket.engineer_name}</td>
      <td>{dateOfChangeFormatted}</td>
      <td>{startDateFormatted}</td>
      <td>{completionDateFormatted}</td>
    </tr>
  );
};

export default TicketRow;
