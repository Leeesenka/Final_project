import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SearchTicket from './SearchTicket';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TicketRow from './TicketRow';
import './TicketTable.css';

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = async () => {
    try {
      const response = await fetch('http://localhost:3030/all_tickets');
      const data = await response.json();

      if (data && data.length > 0) {
        setTickets(data);
        setFilteredTickets(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterTickets = (filtered) => {
    setFilteredTickets(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const filtered = tickets.filter((ticket) => {
        const ticketDate = new Date(ticket.created_at);
        return ticketDate.toDateString() === date.toDateString();
      });
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(tickets);
    }
  };

  const openDescription = (id, name) => {
    window.open(`/description?id=${id}&engineer=${name}`);
  };

  return (
    <div className="ticket-table">
      <div className="filters">
        <div className="filter-label">Filter by Client:</div>
        <SearchTicket tickets={tickets} onFilterTickets={handleFilterTickets} />

        <div className="filter-label">Filter by Date:</div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          isClearable
          className="form-control"
          placeholderText="Select a date"
        />
      </div>
      <table id='table-manager'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Created At</th>
            <th>Subject</th>
            <th>Equipment Name</th>
            <th>Criticality Name</th>
            <th>Engineer</th>
            <th>Date of change</th>
            <th>Start date</th>
            <th>Completion date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <TicketRow
              ticket={ticket}
              openDescription={openDescription}
              key={ticket.id}
              isCompleted={!!ticket.completion_date}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
