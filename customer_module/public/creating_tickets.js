const newTicketButton = document.getElementById('new_ticket');

newTicketButton.addEventListener('click', () => {
  window.location.href = 'new_ticket.html';
});

const ticketTable = document.getElementById('ticketTable');

const getAllTickets = async () => {
  try {
    const clientName = "Anna";
    const response = await fetch(`http://localhost:3030/client_tickets/${clientName}`);
    const data = await response.json();

    if (data && data.length > 0) {
      populateTable(data);
    } else {
      // Обработка случая, когда данные пусты
      // Например, можно вывести сообщение "Нет доступных билетов"
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const createTableRow = (rowData) => {
  const row = document.createElement('tr');
  Object.values(rowData).forEach((value) => {
    const cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
  });
  return row;
};

const populateTable = (data) => {
  const tbody = ticketTable.querySelector('tbody');
  tbody.innerHTML = '';
  data.forEach((record) => {
    const row = createTableRow(record);
    tbody.appendChild(row);
  });
};

getAllTickets();
