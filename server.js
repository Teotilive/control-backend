'use strict'

// web server setup
const app = require('./app');
const server = require('http').Server(app);
server.listen(3000, () => {
	console.log('Server started...');

});

//serial port setup
var io = require('socket.io').listen(server);
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
var myPort = new SerialPort("COM3", {baudRate: 9600});


// serial port event handlers
myPort.on('open', () => {
	console.log('Micro-controller connected!...');
});

myPort.on('data', (data) => {
	console.log('Read: '+data);
});