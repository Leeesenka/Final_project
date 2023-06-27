const{db} = require('../config/db.js')

const gettingDataSubject = () => {
    return db('subject')
    .select('id', 'name')
    .orderBy('name')
  };

const gettingDataEquipment = () => {
    return db('equipment')
    .select('id', 'name', 'serial_number')
    .orderBy('name')
  };

const gettingDataCriticality = () => {
    return db('criticality')
    .select('id', 'name', 'hours')
    .orderBy('name')
};  

const sendNewTickets = (ticket) =>{
  return db('newticket')
  .insert(ticket)
  .returning('*');
}

const getAllTickets = () => {
  return db('newticket')
  .select('*')
  .orderBy('id')
}

const getTicket = (ticket_id)=> {
  return db('newticket')
  .select('*')
  .where({id:ticket_id})
}
  
module.exports = {
    gettingDataSubject, 
    gettingDataEquipment,
    gettingDataCriticality,
    sendNewTickets,
    getAllTickets,
    getTicket,
}  

