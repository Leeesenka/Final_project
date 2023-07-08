import React, { useEffect, useState, createContext, useRef } from 'react';

import Engineers from './Engineers';
import ClientAddress from './ClientAddress';
import SaveTicketButton from './SaveTicketButton';
import SendTicket from './SendTicket';
import PngItem_623465 from './image/PngItem_623465.png'
export const TicketContext = createContext(null)

const GetTicketDetails = () => {
  const [ticketData, setTicketData] = useState({});
  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [engineerDetails, setEngineerDetails] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [clientAddress, setClientAddress] = useState('');

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
  const descriptionRef = useRef(null);
  const additionalInformationRef = useRef(null);
  const subjectRef = useRef(null);
  return (
    <div className="manager-ticket">
      <div className='background-ticket'>
        <div className='all-forms'>
      <form id="ticketForm">
        <div className='form-left'>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">ID:</label>
              <input type="text" className="form-control" id="id" value={ticketData.id} readOnly />
             </div>
             <div className="mb-3">
                <label htmlFor="subject" className="form-label">Client:</label>
                <input type="text" className="form-control" id="subject" value={ticketData.client} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject:</label>
                <textarea
                  ref={subjectRef}
                  type="text" 
                  className="form-control" 
                  id="subject" 
                  value={ticketData.subject} 
                  readOnly 
                  style={{ height: `${subjectRef.current?.scrollHeight}px` }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="created-at" className="form-label">Created At:</label>
              <input type="data" className="form-control" id="created-at" value={ticketData.created_at} readOnly />
            </div>
           
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <ClientAddress userId={ticketData.user_id} />
            </div>
            <div className="mb-3">
                <label htmlFor="subject" className="form-label">Equipment Name:</label>
                <input type="text" className="form-control" id="equipment-name" value={ticketData.equipment_name} readOnly />
            </div>
            </div>
            <div className='form-right'>
            <div className="mb-3">
                <label htmlFor="subject" className="form-label">Serial Number:</label>
                <input type="text" className="form-control" id="serial-number" value={ticketData.serial_number} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="subject" className="form-label">Criticality Name:</label>
                <input type="text" className="form-control" id="criticality-name" value={ticketData.criticality_name} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="subject" className="form-label">Hours:</label>
                <input type="text" className="form-control" id="hours" value={ticketData.hours} readOnly />
            </div>
            <label htmlFor="subject" className="form-label">Description:</label>
            <textarea
                ref={descriptionRef}
                className="form-control"
                id="description"
                value={ticketData.description}
                readOnly
                style={{ height: `${descriptionRef.current?.scrollHeight}px`, resize: "vertical" }}
            />
            <div className="mb-3">
              <label htmlFor="engineers" className="form-label">Engineers:</label>
              <TicketContext.Provider value={{setSelectedEngineer,selectedEngineer}}>
                  <Engineers
                      selectedEngineer={selectedEngineer}
                      onEngineerChange={handleEngineerChange}
                  />
              </TicketContext.Provider>
          </div>

          <div className="mb-3">
              <label htmlFor="additional_information" className="form-label">Additional Information:</label>
              <textarea
                ref={additionalInformationRef}
                className="form-control" 
                id="additional_information"
                value={additionalInformation}
                onChange={(e) => handleAdditionalInformationChange(e.target.value)}
                style={{ height: `${additionalInformationRef.current?.scrollHeight}px`, resize: "vertical" }}
            />

          </div>
          </div>
       
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
        engineerDetails={engineerDetails}
        clientAddress={clientAddress}
        
      />
      </div>
      </div>
      <div className='girl-right'>
          <img src={PngItem_623465} alt="Girl's description" />

          </div>
      </div>
    </div>
  );
};

export default GetTicketDetails;