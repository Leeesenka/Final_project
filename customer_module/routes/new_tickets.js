const express = require('express');
const router = express.Router();

const {
	_gettingDataSubject
} = require('../controllers/new_tickets.js');


router.get('/api/subject', _gettingDataSubject);


module.exports = {
	router
}