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
        await getClientInfo(data[0].user_id);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const populateTable = (ticketData) => {
  const createdAtDate = new Date(ticketData.created_at);
  const createdAtFormatted = createdAtDate.toLocaleString();

  document.getElementById('subject').innerHTML = `<input type="text" id="subjectInput" value="${ticketData.subject}" />`;
  document.getElementById('created-at').innerHTML = `<input type="text" id="createdAtInput" value="${createdAtFormatted}" />`;
  document.getElementById('client').innerHTML = `<input type="text" id="clientInput" value="${ticketData.client}" readonly/>`;
  document.getElementById('adress').innerHTML = `<input type="text" id="adressInput" value="${ticketData.adress}" />`;
  document.getElementById('equipment-name').innerHTML = `<input type="text" id="equipmentNameInput" value="${ticketData.equipment_name}" />`;

  document.getElementById('serial-number').innerHTML = `<input type="text" id="serialNumberInput" value="${ticketData.serial_number}" />`;
  document.getElementById('criticality-name').innerHTML = `<input type="text" id="criticalityNameInput" value="${ticketData.criticality_name}" />`;
  document.getElementById('hours').innerHTML = `<input type="text" id="hoursInput" value="${ticketData.hours}" />`;
  document.getElementById('description').innerHTML = `<textarea id="descriptionInput">${ticketData.description}</textarea>`;
  document.getElementById('date_of_change').innerHTML = `<input type="text" id="date_of_changeInput" value="${ticketData.date_of_change}" readonly/>`;  // Set the ticket ID input field value
  document.getElementById('ticketIdInput').value = ticketData.id;
};

const selectEngineers = document.getElementById('engineers');

const ENGINEER_STORAGE_KEY = 'selected_engineer';

// Функция для сохранения выбранного инженера в локальное хранилище
const saveSelectedEngineer = (engineerValue) => {
  localStorage.setItem(ENGINEER_STORAGE_KEY, engineerValue);
};

// Функция для восстановления выбранного инженера из локального хранилища
const restoreSelectedEngineer = () => {
  const selectedEngineer = localStorage.getItem(ENGINEER_STORAGE_KEY);
  if (selectedEngineer) {
    selectEngineers.value = selectedEngineer;
  }
};

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
    // Восстановление выбранного инженера после загрузки данных
    restoreSelectedEngineer();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Обработчик события выбора инженера
selectEngineers.addEventListener('change', (event) => {
  const selectedEngineer = event.target.value;
  // Сохранение выбранного инженера в локальное хранилище
  saveSelectedEngineer(selectedEngineer);
});


getEngineers();
getTicketDetails();

const getClientInfo = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:3030/client_adress/${userId}`);
    const data = await response.json();
   console.log(data)
    if (data && data[0].address) {
      document.getElementById('adressInput').value = data[0].address;
    // Set the client address value
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const saveButton = document.getElementById('saveButton');
const sendButton = document.getElementById('sendButton');
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
const saveTicket = async (event) => {
  event.preventDefault();

  const subjectValue = document.getElementById('subjectInput').value;
  const createdAtValue = document.getElementById('createdAtInput').value;
  const clientValue = document.getElementById('clientInput').value;
  const adressValue = document.getElementById('adressInput').value;
  const equipmentNameValue = document.getElementById('equipmentNameInput').value;
  const serialNumberValue = document.getElementById('serialNumberInput').value;
  const criticalityNameValue = document.getElementById('criticalityNameInput').value;
  const hoursValue = document.getElementById('hoursInput').value;
  const descriptionValue = document.getElementById('descriptionInput').value;
  const engineerValue = selectEngineers.value;
  const additionalInformationValue = document.getElementById('additional_information').value;
  const currentDate = new Date();
  const dateOfChangeValue = formatDate(currentDate);

  const formData = {
    subject: subjectValue,
    created_at: createdAtValue,
    client: clientValue,
    adress: adressValue,
    equipment_name: equipmentNameValue,
    serial_number: serialNumberValue,
    criticality_name: criticalityNameValue,
    hours: hoursValue,
    description: descriptionValue,
    engineer: engineerValue,
    additional_information: additionalInformationValue,
    date_of_change: dateOfChangeValue,
  };

  try {
    const ticketId = document.getElementById('ticketIdInput').value;
    formData.id = ticketId;
    const response = await fetch(`http://127.0.0.1:3030/saveticket/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Ticket saved successfully');
      alert('Ticket has been updated.');
    } else {
      console.error('Error:', response.status);
      alert('Error updating ticket!');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending data!');
  }
};


const sendTicket = () => {
  const subjectValue = document.getElementById('subjectInput').value;
  const createdAtValue = document.getElementById('createdAtInput').value;
  const clientValue = document.getElementById('clientInput').value;
  const adressValue = document.getElementById('adressInput').value;
  const equipmentNameValue = document.getElementById('equipmentNameInput').value;
  const serialNumberValue = document.getElementById('serialNumberInput').value;
  const criticalityNameValue = document.getElementById('criticalityNameInput').value;
  const hoursValue = document.getElementById('hoursInput').value;
  const descriptionValue = document.getElementById('descriptionInput').value;
  const engineerValue = selectEngineers.value;
  const additionalInformationValue = document.getElementById('additional_information').value;

  const formData = {
    subject: subjectValue,
    created_at: createdAtValue,
    client: clientValue,
    adress: adressValue,
    equipment_name: equipmentNameValue,
    serial_number: serialNumberValue,
    criticality_name: criticalityNameValue,
    hours: hoursValue,
    description: descriptionValue,
    engineer: engineerValue,
    additional_information: additionalInformationValue,
  };

  const jsonData = JSON.stringify(formData, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const anchorElement = document.createElement('a');
  anchorElement.href = URL.createObjectURL(blob);
  anchorElement.download = 'ticketData.json';
  anchorElement.style.display = 'none';

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);

  console.log('Ticket data saved successfully');
  alert('Ticket data has been saved to ticketData.json.');
};

saveButton.addEventListener('click', saveTicket);
sendButton.addEventListener('click', sendTicket);
