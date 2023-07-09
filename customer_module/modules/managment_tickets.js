const{db} = require('../config/db.js')

const gettingEngineers = () => {
    return db('engineer')
    .select('id', 'name', 'specialization', 'contact_number', 'email', 'department', 'chat_id' )
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
       
        additional_information,
        date_of_change,
        engineer_id
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
            
            additional_information,
            date_of_change,
            engineer_id
        })
        .returning('*');
};

const updateTicketBot = (id, ticket) => {
  const {
      completion_date,
   
  } = ticket;

  return db('managerticket')
      .where({ id })
      .update({
          completion_date,
       
      })
      .returning('*');
};
const updateTicketBotStart = (id, ticket) => {
  const {
    start_date,
   
  } = ticket;

  return db('managerticket')
      .where({ id })
      .update({
        start_date,
      })
      .returning('*');
};

const gettingAdress = (user_id) => {
  return db('client_info')
  .select('user_id', 'address', 'phone', 'contact_person' )
  .where({user_id:user_id})
};

const searchTicket = (client) => {
  return db('managerticket')
    .select('*')
    .whereRaw('LOWER(client) LIKE ?', `${client.toLowerCase()}%`)
    .returning('*');
}
const searchTicketData = (createdAt) => {
  return db('managerticket')
  .select('*')
  .whereRaw('LOWER(created_at::text) LIKE ?', `${createdAt.toLowerCase()}%`)
  .returning('*');
};

const deleteTicket = (id) => {
  return db('managerticket')
  .where({id})
  .del()
  .returning('*')
}

module.exports = {
    gettingEngineers,
    sendEngineerTicket,
    updateTicketId,
    gettingAdress,
    updateTicketBot,
    updateTicketBotStart,
    searchTicket,
    deleteTicket,
    searchTicketData
}    