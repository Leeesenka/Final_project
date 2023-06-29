const{db} = require('../config/db.js')

const gettingEngineers = () => {
    return db('engineer')
    .select('id', 'name', 'specialization', 'contact_number', 'email', 'department' )
    .orderBy('name')
  };
 
const sendEngineerTicket = (ticket) =>{
    return db('managerticket')
    .insert(ticket)
    .returning('*');
  } 

  
  // const updateTicketId = (id, ticket) =>{
  //   return db('managerticket')
  //   .where({id})
  //   .update('subject', 'equipment_name', 'serial_number',  'criticality_name', 'hours', 'description', 'completion_date', 'date_of_change', 'engineer')
  //   // .update(ticket)
  //   .returning('*');
  // }  
  const updateTicketId = (id, ticket) => {
    const {
        subject,
        equipment_name,
        serial_number,
        criticality_name,
        hours,
        description,
        completion_date,
        date_of_change,
        engineer
    } = ticket;

    return db('managerticket')
        .where({ id })
        .update({
            subject,
            equipment_name,
            serial_number,
            criticality_name,
            hours,
            description,
            completion_date,
            date_of_change,
            engineer
        })
        .returning('*');
};

const gettingAdress = (user_id) => {
  return db('client_info')
  .select('user_id', 'address', 'phone', 'contact_person' )
  .where({user_id:user_id})
};

module.exports = {
    gettingEngineers,
    sendEngineerTicket,
    updateTicketId,
    gettingAdress
}    