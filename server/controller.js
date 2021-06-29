const db = require('../db/connection.js');

var queryStr = 'SELECT reviews.id, JSON_ARRAYAGG(review_photos.photo_url) FROM reviews INNER JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = 5 GROUP BY reviews.id';
var queryStrin = 'SELECT reviews.*, group_concat(review_photos.photo_url) FROM reviews INNER JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = 5 group by reviews.id;'

let controller = {
  getReview: (req, res) => {
    // var queryString = `SELECT * FROM reviews INNER JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE product_id = ${req.params.id}`;
    // var queryString = `SELECT * FROM reviews WHERE product_id = ${req.params.id}`;
    var queryString = 'SELECT reviews.id, array_agg(reviews_photos.photo_url) FROM reviews INNER JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = 5 GROUP BY reviews.id;'
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
}

// var queryString = `SELECT reviews.*, reviews_photos.photo_url FROM reviews INNER JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE product_id = ${req.params.id}`;

module.exports = controller;