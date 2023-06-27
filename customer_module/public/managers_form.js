const ticketTable = document.getElementById('ticketTable');

const getAllTickets = async () => {
  try {
    const response = await fetch('http://localhost:3030/all_tickets');
    const data = await response.json();

    if (data && data.length > 0) {
      populateTable(data);
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
  row.addEventListener('click', () => {
    // Open a new window with the full description of the row
    window.open('description.html?id=' + rowData.id, '_blank');
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
