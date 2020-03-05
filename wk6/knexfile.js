// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'week6',
      user: 'postgres',
      password: 'a'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
/* UNUSED CODE FOR THIS ASSIGNMENT
  test: {
    client: 'pg',
    connection: {
      database: 'gins-test',
      user:     'postgres',
      password: 'a'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'gins',
      user: 'postgres',
      password: 'a'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
*/
};
