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
    .leftJoin('engineer', 'managerticket.engineer_id', '=', 'engineer.id')
    .select( 
      'managerticket.id',
      'managerticket.client',
      'managerticket.created_at',
      'managerticket.subject',
      'managerticket.equipment_name',
      'managerticket.criticality_name',
      'managerticket.hours',
      'engineer.name AS engineer_name',
      'engineer.chat_id AS engineer_chat_id',
      'managerticket.completion_date',
      'managerticket.date_of_change',
      'managerticket.start_date',
      'managerticket.comment'

    )
    .returning('*')
    .orderBy('managerticket.id');
};







const getClientTickets = (client) => {
  return db('managerticket')
  .select('id', 'client', 'created_at', 'subject', 'equipment_name', 'serial_number', 'criticality_name', 'hours', 'description', 'completion_date', )
  .where({client:client})

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
    getClientTickets
}  

