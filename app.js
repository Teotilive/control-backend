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
app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.send('http://localhost:4200/');
});

app.get('/user', function (req, res) {
	UserDAO.getUsers()
	.then((data)=> {
		res.status(200).send(data);
	})
	.catch(e => {
		console.log(e.stack);
		res.sendStatus(500);
	});	
});

app.put('/user', function (req, res) {
	var user = {
		"name": req.body.name,
		"password": req.body.password 
	};
	var result = UserDAO.updateUser(user);
	result.then(()=> {
		res.sendStatus(200);
	})
	.catch(e => {
		console.log(e.stack);
		res.sendStatus(500);
	});	
});

app.post('/user', function (req, res) {
	var user = {
		"name": req.body.name,
		"password": req.body.password 
	};
	var result = UserDAO.createUser(user);
	result.then(()=> {
		res.sendStatus(200);
	})
	.catch(e => {
		console.log(e.stack);
		res.sendStatus(500);
	});
});

app.delete('/user', function (req, res) {
	var result = UserDAO.deleteUser(req.body.name);
	result.then(()=> {
		res.sendStatus(200);
	})
	.catch(e => {
		console.log(e.stack);
		res.sendStatus(500);
	});
});
module.exports = app;