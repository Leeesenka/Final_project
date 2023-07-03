import React, { useEffect, useState, createContext} from 'react';
import Engineers from './Engineers';
import ClientAddress from './ClientAddress';
import SaveTicketButton from './SaveTicketButton';
import SendTicket from './SendTicket';

export const TicketContext = createContext(null)

const GetTicketDetails = () => {
  const [ticketData, setTicketData] = useState({});
  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');

  const handleEngineerChange = (engineerId) => {
    // console.log('zzzzzz',engineerId);
    // setSelectedEngineer(engineerId);
  };

  const handleAdditionalInformationChange = (value) => {
    setAdditionalInformation(value);
  };

  useEffect(() => {
    const getTicketDetails = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const ticketId = urlParams.get('id');
        

        if (ticketId) {
          const response = await fetch(`http://127.0.0.1:3030/all_tickets/${ticketId}`);
          const data = await response.json();

          if (data && data.length > 0) {
            setTicketData(data[0]);
            setAdditionalInformation(data[0].additional_information || '');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getTicketDetails();
  }, []);

  const handleSaveLastUpdated = (date) => {
    setLastUpdated(date);
  };

  return (
    <div className="manager-ticket">
      <form id="ticketForm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Field</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">ID:</th>
              <td id="id">{ticketData.id}</td>
            </tr>
            <tr>
              <th scope="row">Subject:</th>
              <td id="subject">{ticketData.subject}</td>
            </tr>
            <tr>
              <th scope="row">Created At:</th>
              <td id="created-at">{ticketData.created_at}</td>
            </tr>
            <tr>
              <th scope="row">Client:</th>
              <td id="client">{ticketData.client}</td>
            </tr>
            <tr>
              <th scope="row">Address:</th>
              <td id="address">
                <ClientAddress userId={ticketData.user_id} />
              </td>
            </tr>
            <tr>
              <th scope="row">Equipment Name:</th>
              <td id="equipment-name">{ticketData.equipment_name}</td>
            </tr>
            <tr>
              <th scope="row">Serial Number:</th>
              <td id="serial-number">{ticketData.serial_number}</td>
            </tr>
            <tr>
              <th scope="row">Criticality Name:</th>
              <td id="criticality-name">{ticketData.criticality_name}</td>
            </tr>
            <tr>
              <th scope="row">Hours:</th>
              <td id="hours">{ticketData.hours}</td>
            </tr>
            <tr>
              <th scope="row">Description:</th>
              <td id="description">{ticketData.description}</td>
            </tr>
            <tr>
              <th scope="row">Engineers:</th>
              <td id="engineers">
                <TicketContext.Provider value={{setSelectedEngineer,selectedEngineer}}>
                  <Engineers
                    selectedEngineer={selectedEngineer}
                    onEngineerChange={handleEngineerChange}
                  />
                </TicketContext.Provider>
              </td>
            </tr>
            <tr>
              <th scope="row">Additional Information:</th>
              <td id="additional-information">
                <input
                  id="additional_information"
                  className="form-control"
                  type="text"
                  value={additionalInformation}
                  onChange={(e) => handleAdditionalInformationChange(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Date of Change:</th>
              <td id="date-of-change">
                {lastUpdated ? (
                  <span>{lastUpdated}</span>
                ) : (
                  <span>{ticketData.date_of_change || ''}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className='button-save-send'>
      <TicketContext.Provider value={{selectedEngineer}}>
        <SaveTicketButton
          ticketData={ticketData}
          additionalInformation={additionalInformation}
          onAdditionalInformationChange={handleAdditionalInformationChange}
          engineerselect={selectedEngineer}
          onSaveLastUpdated={handleSaveLastUpdated}
        />
      </TicketContext.Provider>
      <SendTicket
        ticketData={ticketData}
        additionalInformation={additionalInformation}
        selectedEngineer={selectedEngineer}
      />
      </div>
    </div>
  );
};

export default GetTicketDetails;
