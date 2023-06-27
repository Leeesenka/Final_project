const {
    gettingEngineers,
    sendEngineerTicket,
} = require('../modules/managment_tickets.js');

const _gettingEngineers = (req,res) => {
    gettingEngineers()
    .then(data => {
        res.json(data)
        console.log(data)
        
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
} 

const _sendEngineerTicket = (req,res) => {
    sendEngineerTicket(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ msg: err.message });
    });
};
module.exports = {
	_gettingEngineers,
    _sendEngineerTicket,
}