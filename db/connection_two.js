var express    = require("express");
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'ec2-13-59-19-173.us-east-2.compute.amazonaws.com',
  port     : '3306',
  user     : 'scott',
  password : 'password',
  database : 'ratings_and_reviews'

});

connection.connect()

connection.query('SHOW TABLES;', (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log(results);
  }
})

module.exports = connection;
