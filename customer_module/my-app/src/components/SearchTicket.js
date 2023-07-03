import React, { useState } from 'react';

const SearchTicket = ({ tickets, onFilterTickets }) => {
  const [clientName, setClientName] = useState('');

  const handleSearch = () => {
    const filtered = tickets.filter((ticket) =>
      ticket.client.toLowerCase().includes(clientName.toLowerCase())
    );
    onFilterTickets(filtered);
  };

  return (
    <div className='client-name'>
      <input class="form-control" 
        type="text"
        placeholder="Enter client name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
       
      />
      <button  class="btn btn-primary" id='search_client' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchTicket;
