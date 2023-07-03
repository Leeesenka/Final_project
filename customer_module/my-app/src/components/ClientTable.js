import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const ClientTable = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = async () => {
    try {
      const clientName = 'Anna';
      const response = await fetch(`http://localhost:3030/client_tickets/${clientName}`);
      const data = await response.json();

      if (data && data.length > 0) {
        setTickets(data);
      } else {
        setTickets([]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:3030/all_tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Ticket deleted successfully');
       
        getAllTickets();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createTableRow = (rowData) => {
    return (
      <tr key={rowData.id}>
        {Object.values(rowData).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTicket(rowData.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className='client-table'>
      <Link to="/new-ticket" className="btn btn-primary mb-3">New Ticket</Link>
      <table id="ticketTable" className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Created At</th>
            <th>Subject</th>
            <th>Equipment Name</th>
            <th>Serial Number</th>
            <th>Criticality Name</th>
            <th>Hours</th>
            <th>Description</th>
            <th>Completion date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            createTableRow(ticket)
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
