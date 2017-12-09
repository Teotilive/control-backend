'use strict'

// web server setup
const app = require('./app');
const server = require('http').Server(app);

server.listen(3000, () => {
	console.log('Server started...');
	const myPort = require('./port').CustomPort;
});
