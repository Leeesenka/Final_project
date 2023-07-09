import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const ClientTable = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const [tickets, setTickets] = useState([]);
  const [filterComplete, setFilterComplete] = useState(false);
  
  const navigate = useNavigate();
  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = async () => {
    try {
      const response = await fetch(`http://localhost:3030/client_tickets/${username}`);
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
    // const createdAt = moment(rowData.created_at).utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
    const createdAt = moment(rowData.created_at).add(3, 'hours').format('YYYY-MM-DD HH:mm');
    const completionDate = rowData.completion_date ? moment(rowData.completion_date).format('DD MMMM YYYY, HH:mm') : '';
    return (
      <tr key={rowData.id}>
        <td>{rowData.id}</td>
        <td>{rowData.client}</td>
        <td>{createdAt}</td>
        <td>{rowData.subject}</td>
        <td>{rowData.equipment_name}</td>
        <td>{rowData.serial_number}</td>
        <td>{rowData.criticality_name}</td>
        <td>{rowData.hours}</td>
        <td>{rowData.description}</td>
        <td>{completionDate}</td>
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

  const filteredTickets = filterComplete 
    ? tickets.filter(ticket => ticket.completion_date) 
    : tickets;

  return (
    <div className='client-table'>
     <button id='new-ticket' onClick={() => navigate("/new-ticket")}>New Ticket</button>
      <button id='complicated'
        className={`complicated ${filterComplete ? 'btn-success' : 'btn-secondary'}`}
        onClick={() => setFilterComplete(!filterComplete)}
      >
        {filterComplete ? 'Show All Tickets' : 'Show Completed Tickets'}
      </button>
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
          {filteredTickets.map((ticket) => (
            createTableRow(ticket)
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
