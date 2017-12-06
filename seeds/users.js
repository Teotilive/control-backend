var moment = require('moment');
const now = moment().format('YYYY-MM-DD HH:MM:SS');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'A0', password: '1234', last_access: now},
        {name: 'B0', password: '7890', last_access: now},
        {name: 'C0', password: '6666', last_access: now},
        {name: 'D0', password: '0000', last_access: now}
      ]);
    });
};
