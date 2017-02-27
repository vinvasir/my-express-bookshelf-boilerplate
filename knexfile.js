// Update with your config settings.

module.exports = {

  testing: {
    client: 'postgresql',
    connection: {
      host:     '127.0.0.1',
      user:     'postgres',
      password: 'password',      
      database: 'learnco_blog_test'
    },
    pool: {
      min:2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      host:     '127.0.0.1',
      user:     'postgres',
      password: 'password',
      database: 'learnco_blog',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
