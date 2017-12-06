'use strict'
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

function getUsers () {
    var query = knex('users').select('*');
    return query;
 };
module.exports = {
	getUsers
};
