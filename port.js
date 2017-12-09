'use strict'
const UserDAO = require('./repository/user-repository');
const SerialPort = require('serialport');
//serial port setup

var usr="";
var pwd="";
var delCount = 0;
var CustomPort = new SerialPort("COM3", {baudRate: 9600});



// serial port event handlers
CustomPort.on('open', () => {
	console.log('Micro-controller connected!...');
	usr="";
	pwd="";
});

CustomPort.on('data', (data) => {
	console.log('Read: '+data);
	if(data!='*') {
		if(delCount==0) {
			usr+= data;
		} else {
			pwd+= data;
		}
	} else {
		delCount++;
		if(delCount==2){
			console.log("User: " + usr);
			console.log("Password: " + pwd);
			var user = {
				"name": usr,
				"password": pwd
			};
			validateUser(user);
			usr = "";
			pwd = "";
			delCount = 0;
		}
	} 
});

function validateUser(user) {
	UserDAO.findUser(user)
	.then((result)=> {
		var accessToken;
		if(result.length > 0) {
			accessToken = 'A';
			UserDAO.updateUser(user).then(()=> {
				console.log("updated");
			});
		} else {
			accessToken = 'D';
		}
		CustomPort.write(accessToken, (err)=> {
			if (err) {
   				return console.log('Error on write: ', err.message);
  			}
  			var grant = (accessToken=='A')? "aceptado": "denegado";
  			console.log("El acceso de "+ user.name + " fue " + grant)
  		});
	})
	.catch(e=> {
		console.log(e);
	})
}
module.exports = {CustomPort,validateUser }