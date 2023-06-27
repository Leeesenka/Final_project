const ticketDetails = document.getElementById('ticketDetails');

const getTicketDetails = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('id');
    
    if (ticketId) {
      const response = await fetch(`http://127.0.0.1:3030/all_tickets/${ticketId}`);
      const data = await response.json();

      if (data && data.length > 0) {
        populateTable(data[0]);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const populateTable = (ticketData) => {
  document.getElementById('subject').textContent = ticketData.subject;
  document.getElementById('created-at').textContent = ticketData.created_at;
  document.getElementById('client').textContent = ticketData.client;
  document.getElementById('equipment-name').textContent = ticketData.equipment_name;
  document.getElementById('serial-number').textContent = ticketData.serial_number;
  document.getElementById('criticality-name').textContent = ticketData.criticality_name;
  document.getElementById('hours').textContent = ticketData.hours;
  document.getElementById('description').textContent = ticketData.description;
};


getTicketDetails();
