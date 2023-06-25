
const express = require('express');
const router = express.Router();

const {
	_getAllProfiles,
	_getProfile,
	_insertProfile,
	_updateProfile,
	_checkPfPw
} = require('../controllers/profiles.js');


router.get ('/profiles', _getAllProfiles);
router.get ('/profiles/:id', _getProfile);
router.post('/profiles', _insertProfile);
router.put('/profiles/:id', _updateProfile);
router.post('/checkprofile', _checkPfPw);

module.exports = {
	router
}

 