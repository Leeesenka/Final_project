
const {
	gettingDataSubject,
    gettingDataEquipment,
    gettingDataCriticality,
    sendNewTickets,
    getAllTickets,
    getTicket,
} = require('../modules/new_tickets.js');


const _gettingDataSubject = (req,res) => {
    gettingDataSubject()
    .then(data => {
        res.json(data)
        console.log(data)
        
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
} 

const _gettingDataEquipment = (req,res) => {
    gettingDataEquipment()
    .then(data => {
        res.json(data)
        console.log(data)
        
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
} 

const _gettingDataCriticality = (req,res) => {
    gettingDataCriticality()
    .then(data => {
        res.json(data)
        console.log(data)
        
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
} 

const _sendNewTickets = (req,res) => {
    sendNewTickets(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ msg: err.message });
    });
};

const _getAllTickets = (req,res) => {
    getAllTickets()
    .then(data => {
        res.json(data)
        console.log(data)
        
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
} 

const _getTicket = (req,res) => {
    const id = req.params.id
    getTicket(id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
}

module.exports = {
	_gettingDataSubject,
    _gettingDataEquipment,
    _gettingDataCriticality,
    _sendNewTickets,
    _getAllTickets,
    _getTicket,
}
