'use strict'
const UserDAO = require('./repository/user-repository');
const SerialPort = require('serialport');
//serial port setup

var usr="";
var pwd="";
var delCount = 0;
//var io = require('socket.io').listen(server);
var CustomPort = new SerialPort("COM3", {baudRate: 9600});



// serial port event handlers
CustomPort.on('open', () => {
	console.log('Micro-controller connected!...');
	usr="";
	pwd="";
});

CustomPort.on('data', (data) => {
	console.log('Read: '+data);
	if(data!='F') {
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
			validateUser(usr, pwd);
			usr = "";
			pwd = "";
			delCount = 0;
		}
	} 
});

function validateUser(user, pass) {
	UserDAO.findUser(user, pass)
	.then((result)=> {
		var accessToken;
		if(result.length > 0) {
			accessToken = 'A';
		} else {
			accessToken = 'D';
		}
		CustomPort.write(accessToken, (err)=> {
			if (err) {
   				return console.log('Error on write: ', err.message);
  			}
  			var grant = (accessToken=='A')? "aceptado": "denegado";
  			console.log("El acceso de "+ user + " fue " + grant)
  		});
	})
	.catch(e=> {
		console.log(e);
	})
}
module.exports = {CustomPort,validateUser }