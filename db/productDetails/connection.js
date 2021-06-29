const Pool  = require('pg').Pool;

const pool = new Pool ({
  host: 'localhost',
  user: 'austinyeon',
  database: 'productdetails',
  password: 'sdc',
  port: 5432
});

pool.connect();

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
}