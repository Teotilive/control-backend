'use strict'
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);
const DateUtil = require('../utils/date-util');

function getUsers () {
    var query = knex('users').select('*');
    console.log(query.toQuery());
    return query;
 };

function updateUser (user) {
	var data = {
		"last_access": DateUtil.currentDateBD(),
		"password": user.password
	};
	var whereData = {
		"name": user.name
	}
    var query = knex('users').update(data).where(whereData).returning('id');
    console.log(query.toQuery());
    return query;
 };

 function createUser (user) {
	var data = {
		"name": user.name,
		"password": user.password,
		"last_access": DateUtil.currentDateBD()
	};
	
    var query = knex('users').insert(data);
    console.log(query.toQuery());
    return query;
 };

 function deleteUser (name) {
	var whereData = {"name":name};
    var query = knex('users').del().where(whereData);
    console.log(query.toQuery());
    return query;
 };

 function findUser (name, password) {
	var whereData = {
		"name": name,
		"password": password
	}
    var query = knex('users').where(whereData);
    console.log(query.toQuery());
    return query;
 };

module.exports = {
	getUsers, createUser,updateUser,deleteUser, findUser
};
