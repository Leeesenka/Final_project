// Declaring variables and constants
const regFields = {
	first_name: 'First name:',
	last_name: 'Last name:',
	email: 'E-Mail:',
	username: 'Username:',
	password: 'Password:',
	created_date: 'Created_date:',
	last_login_date: 'Last login date:',
};
const field_list_registry = ['first_name', 'last_name', 'email', 'username', 'password'];

const spinner = '<div class="spinner"> \
									<div class="blob top"></div> \
									<div class="blob bottom"></div> \
									<div class="blob left"></div> \
									<div class="blob move-blob"></div> \
								<div>';

// Creating fields in the registration form
let divRegField = document.querySelector("#reg_fields");
displayFields(regFields, divRegField, 'reg', listenRegistry, true); // Последний параметр установлен в true
// Change the properties of several fields in the registration form
const regForm = document.forms['registry'].elements;
regForm['email'].type = 'email';
regForm['created_date'].readOnly = true;
regForm['last_login_date'].readOnly = true;

//Function for creating fields in forms
function displayFields(fieldsObj, target_tag, prefix, listenFunc, isPassword) { // Добавлен параметр isPassword
  for (field in fieldsObj) {
    let div = document.createElement('div');
    div.classList.add('field_div');

    let label = document.createElement('label');
    label.for = field;
    label.id = 'lbl' + '_' + prefix + '_' + field;
    label.classList.add('label' + '_' + prefix);
    label.textContent = fieldsObj[field];

    let input = document.createElement('input');
    input.name = field;
    input.classList.add('input' + '_' + prefix);
    input.addEventListener('input', listenFunc);
    // Установка типа поля ввода в зависимости от параметра isPassword
    input.type = isPassword && field === 'password' ? 'password' : 'text';

    div.appendChild(label);
    div.appendChild(input);
    target_tag.appendChild(div);
  }
}

// The function handles keystrokes in the registration form.
// If all required fields are filled in, activates the button
function listenRegistry(e) {
	const form = document.forms['registry'].elements;
	const isFill = field_list_registry.every(value => form[value].value);
	if (isFill) {
		form['button'].disabled = false;
	} else {
		form['button'].disabled = true;
	}
}

// The function of processing pressing the registration button.
// Sending data to the server. Creating a new user
async function clickOnRegistry(e) {
	e.preventDefault();
	const form = document.forms['registry'].elements;
	const divInfo = document.querySelector('#info_block_r');
	divInfo.textContent = '';
	divInfo.innerHTML = spinner;

	const form_obj = {};
	for (const el of field_list_registry) {
		form_obj[el] = form[el].value;
	}

	divInfo.innerHTML = spinner;

	const requestData = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(form_obj),
	};

	try {
		const res = await fetch("/profiles", requestData);
		if (res.status === 200) {
			const resInfo = await res.json();
			console.log('Ok result', resInfo[0]);
			divInfo.textContent = 'Profile added successfully';

			// Fill in the registration form with the data obtained after creating the profile
			// This data is already in the response to the add request, but, for training,
			// I request this data again with a GET request
			const form = document.forms['registry'].elements;
			const dataProfile = await getProfileDetail(resInfo[0].id);
			console.log('DataProfile', dataProfile);
			if (dataProfile.ok) {
				fillForm(dataProfile.data, regFields, form);
			} else {
				divInfo.textContent = dataProfile.msg;
			}
		} else {
			const error_mes = await res.json();
			console.log('Error:', error_mes.msg_i);
			divInfo.textContent = 'Profile creation error: ' + error_mes.msg_i;
		}
	} catch (err) {
		console.log("Error ----001", err);
		return "Error ----001";
	}
}

// The function of obtaining user data upon request GET.
async function getProfileDetail(id) {
	try {
		const res = await fetch(`/api/profiles/${id}`);
		const resInfo = await res.json();
		if (!res.ok) {
			return { ok: false, msg: "Error in Get Request" };
		} else if (resInfo.length === 0) {
			return { ok: false, msg: "There is no profile in the database with this ID" };
		} else {
			return { ok: true, data: resInfo[0] };
		}
	} catch (error) {
		return { ok: false, msg: "Error: Connection error" };
	}
}

// Function for filling the form with data
function fillForm(dataObj, fields, tag) {
	for (const el in fields) {
		tag[el].value = dataObj[el];
	}
}
