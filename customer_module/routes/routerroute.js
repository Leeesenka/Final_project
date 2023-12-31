const express = require('express');
const router = express.Router();

const {
	_checkLogin,
	_allLoginsOfUser,
	_checkLastLogin
} = require('../controllers/login.js');

const {
	_gettingDataSubject,
	_gettingDataEquipment,
	_gettingDataCriticality,
	_sendNewTickets,
	_getAllTickets,
	_getTicket,
	_getClientTickets
} = require('../controllers/new_tickets.js');

const {
	_getAllProfiles,
	_getProfile,
	_insertProfile,
	_updateProfile,
	_checkPfPw
} = require('../controllers/profiles.js');

const {
	_gettingEngineers,
	_sendEngineerTicket,
	_updateTicketId,
	_gettingAdress,
	_updateTicketBot,
	_updateTicketBotStart,
	_searchTicket,
	_deleteTicket,
	_searchTicketData
} = require('../controllers/managment_tickets.js');



router.post ('/login', _checkLogin);
router.get('/login/:id', _allLoginsOfUser)
router.get('/subject', _gettingDataSubject);
router.get ('/profiles', _getAllProfiles);
router.get ('/profiles/:id', _getProfile);
router.post('/profiles', _insertProfile);
router.put('/profiles/:id', _updateProfile);
router.post('/checkprofile', _checkPfPw);
router.get('/equipment', _gettingDataEquipment);
router.get('/criticality', _gettingDataCriticality);
router.post('/newticket', _sendNewTickets);
router.get('/last_login', _checkLastLogin);
router.get('/all_tickets', _getAllTickets);
router.get('/all_tickets/:id', _getTicket);
router.get('/engineers', _gettingEngineers);
router.post('/saveticket', _sendEngineerTicket);
router.put('/saveticket/:id', _updateTicketId);
router.get('/client_adress/:id', _gettingAdress);
router.get('/client_tickets/:client', _getClientTickets);
router.put('/update_completion_date/:id', _updateTicketBot);
router.put('/update_start_date/:id', _updateTicketBotStart);
router.get('/search_ticket/', _searchTicket);
router.delete('/all_tickets/:id', _deleteTicket)
router.get('/search_ticketdata/', _searchTicketData);

module.exports = {
	router
}