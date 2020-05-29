// Update with your config settings.
const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/users";

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/potluckData.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  
  testing:{
    client: "sqlite3",
    connection: {
      filename:'./data/test.db3',
    },
    useNullAsDefault: true,
    migrations: { //npx knex migrate:latest --env testing
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  //heroku postgres
  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
