const db = require('../db/connection.js');
const moment = require('moment')

let controller = {
  getReview: (req, res) => {
    var queryString = `SELECT reviews.*, GROUP_CONCAT(reviews_photos.photo_url) AS photos FROM reviews LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = ${req.params.id} GROUP BY reviews.id`
    db.query(queryString, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        for (var i = 0; i < results.length; i++) {
          if (results[i]['recommended'] === 'true') {
            results[i]['recommended'] = true;
          } else {
            results[i]['recommended'] = false;
          }

          results[i]['date'] = moment(results[i]['date']).format();

          if (results[i]['reported'] === 'true') {
            results[i]['reported'] = true;
          } else {
            results[i]['reported'] = false;
          }

          if (results[i]['response'] === 'null') {
            results[i]['response'] = '';
          }

          if (results[i]['photos'] !== null) {
            results[i]['photos'] = results[i]['photos'].split(',');
          }
        }
        var resultsFormatted = {product: req.params.id, count: results.length, results: results}
        res.status(200).send(resultsFormatted);
      }
    })
  },
  getRatings: (req, res) => {
    var queryString = `SELECT * FROM reviews WHERE product_id = ${req.params.id}`
    db.query(queryString, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log(results)
        res.status(200).send(results);
      }
    })
  }
  // post review (NEED TO ADD REVIEW AND ALSO UPDATE TABLE)
  // change helpfulness
}

module.exports = controller;
