const db = require('../db/connection.js');

// var queryStr = 'SELECT reviews.id, JSON_ARRAYAGG(review_photos.photo_url) FROM reviews INNER JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = 5 GROUP BY reviews.id';
// var queryStrin = 'SELECT reviews.*, group_concat(review_photos.photo_url) FROM reviews INNER JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = 5 group by reviews.id;'

let controller = {
  getReview: (req, res) => {
    var queryString = `SELECT reviews.*, GROUP_CONCAT(reviews_photos.photo_url) AS photos FROM reviews LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = ${req.params.id} GROUP BY reviews.id`
    // var queryString = `SELECT reviews.*, WHERE reviews.product_id = ${req.params.id} GROUP BY reviews.id`
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
          if (results[i]['reported'] === 'true') {
            results[i]['reported'] = true;
          } else {
            results[i]['reported'] = false;
          }
        }
        res.status(200).send(results);
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

// var queryString = `SELECT reviews.*, reviews_photos.photo_url FROM reviews INNER JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE product_id = ${req.params.id}`;

module.exports = controller;


// SELECT reviews.*, GROUP_CONCAT(reviews_photos.photo_url)
// FROM reviews
// JOIN reviews_photos ON reviews.id = reviews_photos.review_id
// WHERE reviews.product_id = 5
// GROUP BY reviews.id

// SELECT offers.*, GROUP_CONCAT(t2.picture_name) AS pictures
// FROM offers AS t1
// JOIN pictures AS t2 ON t1.id=t2.id_offer
// WHERE t1.id = '1'
// GROUP BY t1.id

// SELECT reviews.*, GROUP_CONCAT(reviews_photos.photo_url)
// FROM reviews
// JOIN reviews_photos ON reviews.id = reviews_photos.review_id
// WHERE reviews.product_id = 5
// GROUP BY reviews.id

// SELECT reviews.*, GROUP_CONCAT(reviews_photos.photo_url)
// FROM reviews
// LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id
// WHERE reviews.product_id = 2
// GROUP BY reviews.id
