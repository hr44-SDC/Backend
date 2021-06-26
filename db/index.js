const { Pool, Client } = require('pg')

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'atelier-raw',
  password: 'hello',
  port: 5432,
});

// const pool = new Pool({
//   user,
//   host,
//   database,
//   password,
//   port,
// });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  connect: (err, client, done) => {
    return pool.connect(err, client, done);
  }
}

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// const client = new Client({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })