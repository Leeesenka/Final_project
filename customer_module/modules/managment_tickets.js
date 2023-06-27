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


module.exports = {
    gettingEngineers,
    sendEngineerTicket,
}    