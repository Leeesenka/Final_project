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
  return db('managerticket')
  .insert(ticket)
  .returning('*');
}

const getAllTickets = () => {
  return db('managerticket')
  .select('id', 'client', 'created_at', 'subject', 'equipment_name', 'serial_number', 'criticality_name', 'hours', 'description','engineer','additional_information', 'completion_date', 'date_of_change')
  .orderBy('id')
}

const getTicket = (ticket_id)=> {
  return db('managerticket')
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

