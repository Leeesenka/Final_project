import React from 'react';
import TicketChart from './TicketChart';
import TicketSummary from './TicketSummary';
import SubjectChart from './SubjectChart';

const Home = ({ tickets }) => {
  console.log(tickets);

  return (
    <div className='all-giagram'>
    <div className="diagram">
   
      <TicketChart />
      <TicketSummary tickets={tickets} />
    
      
    </div>
    
    <div className='diagram2'>
    <h1>Sort by subjects</h1>
      <SubjectChart />
      </div>
    </div>
  );
};

export default Home;
