// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: 
      {
      host: '127.0.0.1',
      database: 'control',
      user:     'root',
      password: 'toor',
      charset: 'utf8'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
