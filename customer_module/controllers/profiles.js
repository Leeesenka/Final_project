const bcrypt = require('bcrypt');
const {
	getAllProfiles,
	getProfile,
	insertProfile,
	updateProfile,
	checkPfPw
} = require('../modules/profiles.js')

const _getAllProfiles = (req, res) => {
	getAllProfiles()
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err);
		res.status(404).json({msg_i:err.message})
	})
}

const _getProfile = (req, res) => {
	const id = req.params.id;
	getProfile(id)
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err);
		res.status(404).json({msg_i:err.message})
	})
}


const _insertProfile = (req, res) => {
	console.log("****BODY*************************");
	console.log(req.body);
	console.log("****FORM*************************");
	const salt = bcrypt.genSaltSync(10);
	req.body.password = bcrypt.hashSync(req.body.password, salt);
	insertProfile(req.body)
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err);
		console.log("****FORM*************************");
		console.log(err.detail);
		console.log("****FORM*************************");
		res.status(404).json({msg_i:err.detail})
		// res.status(408)
	})
}

const _updateProfile = (req, res) => {
	console.log("****PARAM*************************");
	console.log(req.params.id);
	console.log("****BODY*************************");
	console.log(req.body);
	console.log("****FORM*************************");
	updateProfile (req.params.id, req.body)
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err);
		res.status(404).json({msg_i:err.detail})
	})
}

const _checkPfPw = (req, res) => {
	console.log("****BODY*************************");
	console.log(req.body);
	console.log("****FORM*************************");
	checkPfPw (req.body)
	.then (data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err);
		res.status (404).json({msg_i:err.detail})
	})
}

module.exports = {
	_getAllProfiles,
	_getProfile,
	_insertProfile,
	_updateProfile,
	_checkPfPw
}

