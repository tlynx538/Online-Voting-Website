// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  testing: {
    client: 'pg',
    connection: {
      host: "localhost",
      database: 'votedb',
      user:     'postgres',
      password: ''
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds : {
      directory: __dirname + '/knex/seeds',
    }
  }

};
