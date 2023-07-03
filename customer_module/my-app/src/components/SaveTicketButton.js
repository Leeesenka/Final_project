
import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { TicketContext } from './Description';
const SaveTicketButton = ({ 
  ticketData, 
  additionalInformation, 
  onAdditionalInformationChange, 
  onSaveLastUpdated, 
  engineers, 
  onEngineerChange,
  engineerselect
}) => {
  const {selectedEngineer} = useContext(TicketContext)
  
  const saveTicket = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      onSaveLastUpdated(formattedDate);

      

      // const engineer = engineers?.find(engineer => engineer.id === Number(selectedEngineer));
      console.log('xxxxx',selectedEngineer);
      // console.log('xxxxx',engineers);
      const updatedTicketData = {
        ...ticketData,
        engineer_id: selectedEngineer ? selectedEngineer : null, 
        additional_information: additionalInformation,
        date_of_change: formattedDate,
      };

      console.log(updatedTicketData.engineer_id);

      const response = await fetch(`http://localhost:3030/saveticket/${ticketData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTicketData),
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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <button className="btn btn-primary" id="saveButton" type="submit" onClick={saveTicket}>
        Save
      </button>
    </div>
  );
};

export default SaveTicketButton;
