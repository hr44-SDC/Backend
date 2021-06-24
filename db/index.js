var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rickjames20!',
  database: 'REVIEWS'
})

connection.connect()

connection.query('SHOW TABLES;', (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log(results);
  }
})

connection.end()