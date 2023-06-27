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

const selectEngineers = document.getElementById('engineers');

const getEngineers = async () => {
  try {
    const response = await fetch('http://localhost:3030/engineers');
    const data = await response.json();

    if (data && data.length > 0) {
      data.forEach((engineer) => {
        const option = document.createElement('option');
        option.text = engineer.name; 
        selectEngineers.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

getEngineers();
getTicketDetails();

const saveButton = document.getElementById('saveButton');
const ticketForm = document.getElementById('ticketForm');

const saveTicket = async () => {
  const subjectValue = document.getElementById('subject').textContent;
  const createdAtValue = document.getElementById('created-at').textContent;
  const clientValue = document.getElementById('client').textContent;
  const equipmentNameValue = document.getElementById('equipment-name').textContent;
  const serialNumberValue = document.getElementById('serial-number').textContent;
  const criticalityNameValue = document.getElementById('criticality-name').textContent;
  const hoursValue = document.getElementById('hours').textContent;
  const descriptionValue = document.getElementById('description').textContent;
  const engineerValue = selectEngineers.value;
  const additionalInformationValue = document.getElementById('additional_information').value;

  const formData = {
    subject: subjectValue,
    created_at: createdAtValue,
    client: clientValue,
    equipment_name: equipmentNameValue,
    serial_number: serialNumberValue,
    criticality_name: criticalityNameValue,
    hours: hoursValue,
    description: descriptionValue,
    engineer: engineerValue,
    additional_information: additionalInformationValue,
  };

  try {
    const response = await fetch('http://127.0.0.1:3030/saveticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Ticket saved successfully');
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

saveButton.addEventListener('click', saveTicket);
