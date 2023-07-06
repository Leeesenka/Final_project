import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const TicketSummary = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = async () => {
    try {
      const response = await fetch('http://localhost:3030/all_tickets');
      const data = await response.json();

      if (data && data.length > 0) {
        setTickets(data);
        console.log(data)
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const hoursDictionary = {
    '4 hours': 4,
    '8 hours': 8,
    '24 hours': 24,
  };

  const convertToHours = (timeString) => {
    let hours = 0;
    
    Object.keys(hoursDictionary).forEach(key => {
      if (timeString && timeString.includes(key)) {
        hours = hoursDictionary[key];
      }
    });
    
    return hours;
  };
  

  const calculateOverdueTickets = (ticket) => {
    const createdAt = new Date(ticket.created_at);
    const hours = convertToHours(ticket.hours);
    console.log("hours t", ticket.hours)
    console.log("hours", hours)
    const dueDate = new Date(createdAt.getTime() + hours * 60 * 60 * 1000);

    const completionDate = ticket.completion_date ? new Date(ticket.completion_date) : new Date(); 

    if (completionDate > dueDate) {
      return 'Просрочен';
    } else {
      return 'Не просрочен';
    }
  };

  const getClientTicketCounts = () => {
    const clientTicketCounts = {};

    tickets.forEach((ticket) => {
      if (clientTicketCounts[ticket.client]) {
        clientTicketCounts[ticket.client].total += 1;
        clientTicketCounts[ticket.client].overdue += (calculateOverdueTickets(ticket) === 'Просрочен' ? 1 : 0);
      } else {
        clientTicketCounts[ticket.client] = {
          total: 1,
          overdue: (calculateOverdueTickets(ticket) === 'Просрочен' ? 1 : 0),
        };
      }
    });

    return clientTicketCounts;
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const clientTicketCounts = getClientTicketCounts();

  return (
    <div className="ticket-summary">
      <h2>Ticket Summary</h2>
      {Object.entries(clientTicketCounts).map(([client, counts]) => (
  <Card key={client} style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{client}</Card.Title>
      <Card.Text>
        Overdue Tickets: {counts.overdue}
        <br/>
        Not Overdue Tickets: {counts.total - counts.overdue}
        <br/>
        Total Tickets: {counts.total}
      </Card.Text>
      <Button variant="primary" id='summary-but' onClick={() => handleClientClick(client)}>See Tickets</Button>
    </Card.Body>
  </Card>
))}
      {selectedClient && (
  <div>
    <h3>Not overdue Tickets for {selectedClient}:</h3>
    <ListGroup variant="flush">
      {tickets
        .filter((ticket) => ticket.client === selectedClient && calculateOverdueTickets(ticket) === 'Не просрочен')
        .map((ticket) => (
          <ListGroup.Item key={ticket.id}>Ticket ID: {ticket.id}</ListGroup.Item>
        ))}
    </ListGroup>
  </div>
)}

    </div>
  );
};

export default TicketSummary;
