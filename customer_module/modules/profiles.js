const {db} = require('../config/db.js')

const getAllProfiles = () => {
	return db('register')
	.select('id', 'first_name', 'last_name', 'email', 'username', 'password', 'created_date', 'last_login_date')
	.orderBy('username')
	// let t="ffff"
	// return t
}
const getProfile = (id) =>{
	return db('register')
	.select('id', 'first_name', 'last_name', 'email', 'username', 'password', 'created_date', 'last_login_date')
	.where({id})
}

const insertProfile = (profile) => {
	console.log("Test from insert Profile", profile);
	return db('register')
	.insert(profile)
	.returning('*')
	// return {"sss":"123","ddd":"456"}
}

const updateProfile = (id, profile) => {
	return db('register')
	.update(profile)
	.where({id})
	.returning('*')
}

const checkPfPw = (qw) => {
	console.log("Content", qw);
	return db('register')
	.select('id', 'username', 'password')
	.where('password',qw.password)
	.where('username', qw.username)
}

module.exports = {
	getAllProfiles,
	getProfile,
	insertProfile,
	updateProfile,
	checkPfPw
}
