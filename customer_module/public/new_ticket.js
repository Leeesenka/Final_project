const selectSubject = document.getElementById('subject');
const selectEquipment = document.getElementById('equipment');
const selectCriticality = document.getElementById('criticality');
const selectLastUsername = document.getElementById('username');
const serialNumber = document.getElementById('number');
const hoursCriticality = document.getElementById('hours');

const getSubjects = async () => {
  try {
    const response = await fetch('http://localhost:3030/subject');
    const data = await response.json();

    if (data && data.length > 0) {
      data.forEach((row) => {
        const option = document.createElement('option');
        option.text = row.name;
        selectSubject.add(option);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

getSubjects();

const getEquipmentList = async () => {
  try {
    const response = await fetch('http://localhost:3030/equipment');
    const data = await response.json();

    if (data && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return [];
};

const populateEquipmentOptions = (equipmentData) => {
  if (equipmentData && equipmentData.length > 0) {
    equipmentData.forEach((row) => {
      const option = document.createElement('option');
      option.text = row.name;
      selectEquipment.add(option);
    });
  }
};

const getSerialNumber = async (selectedEquipment) => {
  try {
    const response = await fetch('http://localhost:3030/equipment');
    const data = await response.json();

    if (data && data.length > 0) {
      const equipment = data.find((item) => item.name === selectedEquipment);
      if (equipment) {
        serialNumber.textContent = equipment.serial_number;
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

getEquipmentList()
  .then((equipmentData) => {
    populateEquipmentOptions(equipmentData);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

selectEquipment.addEventListener('change', (event) => {
  const selectedEquipment = event.target.value;
  getSerialNumber(selectedEquipment);
});

const getCriticality = async () => {
  try {
    const response = await fetch('http://localhost:3030/criticality');
    const data = await response.json();

    if (data && data.length > 0) {
      data.forEach((row) => {
        const option = document.createElement('option');
        option.text = row.name;
        option.value = row.hours; 
        selectCriticality.add(option);
      
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

getCriticality();

selectCriticality.addEventListener('change', (event) => {
  const selectedCriticality = event.target.value;
  hoursCriticality.textContent = selectedCriticality;
 
});

const getLastUsername = async () => {
  try {
    const response = await fetch('http://localhost:3030/last_login');
    const data = await response.json();

    if (data.username) {
      selectLastUsername.textContent = data.username;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

getLastUsername();



const form = document.getElementById('new');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  let criticality;
  if (selectCriticality.value === "24 hours"){
   criticality="Low"}else if(selectCriticality.value === "4 hours"){
  criticality="High"} else{
  criticality="Medium"}
  const username = selectLastUsername.textContent;
  const subject = selectSubject.value;
  const equipment = selectEquipment.value;
  const serialNumb = serialNumber.textContent;
  // const criticality = selectCriticality.value;
  const hours_crit = hoursCriticality.textContent;
  const description = document.getElementById('exampleFormControlTextarea1').value;

  const data = {
    client: username,
    subject: subject,
    equipment_name: equipment,
    serial_number: serialNumb,
    criticality_name: criticality,
    hours: hours_crit,
    description: description
  };

  // Send data to the server in JSON format
  fetch('http://localhost:3030/newticket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      console.log('Server response:', responseData);
      alert('Ticket successfully created!'); // Display the success alert message
      form.reset(); // Reset the form to clear all input fields
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
});
const createTicketButton = document.getElementById('createTicketButton');

createTicketButton.addEventListener('click', () => {
  window.location.href = 'creating_tickets.html';
});