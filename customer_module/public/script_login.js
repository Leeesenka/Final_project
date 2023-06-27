const loginFields = {
	username: 'Username:',
	password: 'Password:',
  };
  const field_list_login = ['username', 'password'];
  
  const spinner = `<div class="spinner">
	<div class="blob top"></div>
	<div class="blob bottom"></div>
	<div class="blob left"></div>
	<div class="blob move-blob"></div>
  </div>`;
  
  // The function handles keystrokes in the login form.
  // If all required fields are filled in, activates the button
  function listenLogin(e) {
	const form = document.forms['login'].elements;
	const isFill = field_list_login.every(value => form[value].value);
	if (isFill) {
	  form['button'].disabled = false;
	} else {
	  form['button'].disabled = true;
	}
  }
  
  // Function for preparing data for a query
  async function clickOnLogin(e) {
	e.preventDefault();
  
	const form = document.getElementById('login1').elements;
	const divInfo = document.querySelector('#info_block_l');
	divInfo.textContent = '';
	divInfo.innerHTML = spinner;
  
	const form_obj = {};
	for (const el of field_list_login) {
	  form_obj[el] = form[el].value;
	}
  
	const requestData = {
	  method: 'POST',
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(form_obj),
	};
  
	const res = await fetch("/login", requestData);
	if (res.status === 200) {
	  const resInfo = await res.json();
	  if (resInfo.data && resInfo.data.length > 0) {
		divInfo.innerHTML = `Login successfully.<br>\
				Hello ${resInfo.data[0].first_name}<br>
				Here is a list of your previous logins:`;
		const loginsList = await getLoginHistory(resInfo.data[0].id);
  
		if (loginsList.ok) {
		  for (let r = 0; r < loginsList.data.length; r++) {
			const newP = document.createElement('p');
			newP.textContent = `${Number(r) + 1}. ${loginsList.data[r].log_date}  ${loginsList.data[r].username}   ${loginsList.data[r].password}`;
			divInfo.appendChild(newP);
		  }
		} else {
		  divInfo.innerHTML += `<br>Can't get login history: ${loginsList.msg}`;
		}
  
		// Redirect to a new page after successful login
		window.location.href = "creating_tickets.html"; // Replace "newpage.html" with the actual URL of the new page you want to redirect to
	  } else {
		divInfo.innerHTML = 'Error: Invalid response from server';
	  }
	} else if (res.status === 404) {
	  const resInfo = await res.json();
	  console.log('Error:', resInfo.msg);
	  alert("Username and password combination is not correct");
  
	  // Display the error message
	  divInfo.innerHTML = 'Error: ' + resInfo.msg;
	} else {
	  const error_mes = await res.json();
	  console.log('Error:', error_mes.msg_i);
	  divInfo.innerHTML = 'Profile creation error: ' + error_mes.msg_i;
	}
  }
  
  // Function for obtaining the login history upon request GET
  async function getLoginHistory(id) {
	try {
	  const res = await fetch(`/api/profiles/${id}/logins`);
	  const resInfo = await res.json();
	  if (!res.ok) {
		return { ok: false, msg: "Error in Get Request" };
	  } else if (resInfo.length === 0) {
		return { ok: false, msg: "There is no login history in the database for this ID" };
	  } else {
		return { ok: true, data: resInfo };
	  }
	} catch (error) {
	  return { ok: false, msg: "Error: Connection error" };
	}
  }
  
  // Attach event listeners
  document.addEventListener('DOMContentLoaded', () => {
	const form = document.forms['login'];
	form.addEventListener('input', listenLogin);
	form.addEventListener('submit', clickOnLogin);
  });
  
  function handleLogout() {
	sessionStorage.removeItem('token');

  }

  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', handleLogout);
  