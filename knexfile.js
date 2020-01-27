module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/recipes-book.db3'
      },
      useNullAsDefault: true, // set to true when using sqlite
      migrations: {
        directory: './data/migrations'
      },
      seeds: {
        directory: './data/seeds'
      },
  
      // need this when we have foreign keys && enforces foreign keys in the database
      pool: {
        afterCreate: (conn, done) => {
          conn.run('PRAGMA foreign_keys = ON', done);
        }
      }
    },
  };