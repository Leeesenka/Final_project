const express = require('express');
const router = express.Router();

const {
	_checkLogin,
	_allLoginsOfUser
} = require('../controllers/login.js');

router.post ('/login', _checkLogin);
router.get('/login/:id', _allLoginsOfUser)

module.exports = {
	router
}