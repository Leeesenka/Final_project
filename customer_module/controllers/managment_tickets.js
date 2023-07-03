const {
    gettingEngineers,
    sendEngineerTicket,
    updateTicketId,
    gettingAdress,
    updateTicketBot,
    updateTicketBotStart,
    searchTicket,
    deleteTicket,
    searchTicketData
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


const _gettingAdress = (req,res) => {
    const id = req.params.id
    gettingAdress(id)
    .then(data => {
        res.json(data)
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
const _updateTicketId = (req,res) => {
    updateTicketId(req.params.id, req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
}
const _updateTicketBot = (req,res) => {
    updateTicketBot(req.params.id, req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
}
const _updateTicketBotStart = (req,res) => {
    updateTicketBotStart(req.params.id, req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
}

const _searchTicket = (req, res) => {
    searchTicket(req.query.client)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ msg: err.message });
      });
  };

  const _searchTicketData = (req, res) => {
    searchTicketData(req.query.created_at)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ msg: err.message });
      });
  };

  const _deleteTicket = (req, res) => {
    deleteTicket(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ msg: err.message });
      });
  };

module.exports = {
	_gettingEngineers,
    _sendEngineerTicket,
    _updateTicketId,
    _gettingAdress,
    _updateTicketBot,
    _updateTicketBotStart,
    _searchTicket,
    _deleteTicket,
    _searchTicketData
}