var knex = require('knex');
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
  table.increments();
  table.string('name').notNull();
  table.string('password').notNull();
  table.dateTime('last_access');
})
};

exports.down = function(knex, Promise) {
  
};
