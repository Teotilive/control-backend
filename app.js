'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UserDAO = require('./repository/user-repository');

// credentials grant
var allowCrossDomain = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
   res.send('http://localhost:4200/');
});

app.get('/users', function (req, res) {
	var result = UserDAO.getUsers();
	result.then((data)=> {
		res.status(200).send(data);
	})
	.catch(e => {
		res.send(500);
	});	
});
module.exports = app;