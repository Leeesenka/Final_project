const bcrypt = require('bcrypt');
const {
	checkLogin,
	addLoginInfo,
	allLoginsOfUser,
	checkLastLogin
} = require('../modules/login.js')

const {
	updateProfile
} = require('../modules/profiles.js')

const _checkLogin = async (req, res) => {
	let login = req.query.username; // Получаем значение username из URL-параметра
	let password = req.body.password;
	console.log(`Login:${login}    Password:${password}`);
  
	try {
	  const data = await checkLogin(login);
  
	  if (data.length === 1) {
		const match = await bcrypt.compare(password, data[0].password);
		if (match) {
		  const currentDate = new Date();
		  const logRegData = {
			user_id: data[0].id,
			username: data[0].username,
			password: data[0].password,
			last_login_date: currentDate.toISOString(),
		  };
  
		  await addTimestampToProfile(data[0].id, { last_login_date: currentDate.toISOString() });
		  await addLoginRegistration(logRegData);
  
		  res.json({
			ok: true,
			data: {
			  message: "Login successful",
			  username: data[0].username, // Включаем имя пользователя в ответ
			},
		  });
		} else {
		  const errorMsg = "Username and password combination is not correct";
		  res.status(404).json({
			ok: false,
			msg: errorMsg,
			alert: errorMsg,
		  });
		}
	  } else if (data.length === 0) {
		const errorMsg = "The user with this login is not registered. Please register first.";
		res.status(404).json({
		  ok: false,
		  msg: errorMsg,
		  alert: errorMsg,
		});
	  } else {
		const errorMsg = "Database structure error. Multiple users found with the same login.";
		res.json({
		  ok: false,
		  msg: errorMsg,
		  alert: errorMsg,
		});
	  }
	} catch (err) {
	  console.log(err);
	  const errorMsg = err.message || "An error occurred.";
	  res.status(404).json({
		ok: false,
		msg: errorMsg,
		alert: errorMsg,
	  });
	}
  };
  
  
  //Makes a change to the date of the last login in the profile
  async function addTimestampToProfile(id) {
	console.log('Start change date ');
	const currentDate = new Date();
	timeStamp = {
	  last_login_date: currentDate.toISOString(),
	};
	result = await updateProfile(id, timeStamp);
	console.log("Last login date in profile has been changed", result);
	return result;
  }
  
  // Adds an entry to the list of logins
  async function addLoginRegistration(data) {
	console.log('Start add login info', data);
	result = await addLoginInfo(data);
	console.log('Login info has been added', result);
	return result;
  }
  
//-------------------------------------------------------
//-------------------------------------------------------

const _allLoginsOfUser = async (req, res) => {
	let id = req.params.id;
	allLoginsOfUser(id)
		.then(data => {
			res.json({
				ok: true,
				data
			})
		})
		.catch(err => {
			const errorMsg = err || "An error occurred.";
			res.json({
				ok: false,
				msg: errorMsg,
				alert: errorMsg
			})
		})
}

const _checkLastLogin = (req,res) => {
    checkLastLogin()
    .then(data => {
        res.json(data)
        
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({msg:err.message})
    })
}    

module.exports = {
	_checkLogin,
	_allLoginsOfUser,
	_checkLastLogin
}
