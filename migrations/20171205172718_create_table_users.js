var knex = require('knex');
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
  table.increments();
  table.string('name');
  table.string('password');
  table.dateTime('last_access');
})
};

exports.down = function(knex, Promise) {
  
};
