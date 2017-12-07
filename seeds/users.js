var DateUtil = require('../utils/date-util');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'A0', password: '1234', last_access: DateUtil.currentDateBD()},
        {name: 'B0', password: '7890', last_access: DateUtil.currentDateBD()},
        {name: 'C0', password: '6666', last_access: DateUtil.currentDateBD()},
        {name: 'D0', password: '0000', last_access: DateUtil.currentDateBD()}
      ]);
    });
};
