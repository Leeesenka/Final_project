const{db} = require('../config/db.js')

const checkLogin = (username) => {
	console.log('login-------', username);
	return db('register')
	.select('id', 'first_name', 'last_name', 'email', 'username', 'password', 'created_date', 'last_login_date')
	.where({username})
}

const allLoginsOfUser = (id) => {
	return db('login')
	.select ('username', 'password', 'last_login_date')
	.where('user_id', id)
	.orderBy ('last_login_date', 'desc')
}

// This module is needed to add login information, 
// it does not have a controller and router
const addLoginInfo = (data) => {
	return db('login')
	.insert(data)
	.returning('*')
}



module.exports = {
	checkLogin,
	addLoginInfo,
	allLoginsOfUser
}
