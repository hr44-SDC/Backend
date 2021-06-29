var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ratings_and_reviews'
})

connection.connect()

connection.query('SHOW TABLES;', (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log(results);
  }
})

module.exports = connection;