const db = require('../db/connection.js');

let controller = {
  getReview: (req, res) => {
    var queryString = `SELECT * FROM reviews WHERE product_id = ${req.params.id}`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  }
}

module.exports = controller;