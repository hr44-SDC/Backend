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
    var queryString = `SELECT reviews.*, GROUP_CONCAT(characteristics_reviews.value) AS characteristic_values,  GROUP_CONCAT(characteristics_reviews.characteristic_id) AS characteristic_id FROM reviews LEFT JOIN characteristics_reviews ON reviews.id = characteristics_reviews.review_id WHERE reviews.product_id = ${req.params.id} GROUP BY reviews.id`
    db.query(queryString, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        var queryString = `SELECT characteristics.name, characteristics.id FROM characteristics WHERE characteristics.product_id = ${req.params.id}`
        db.query(queryString, (errTwo, resultsTwo) => {
          if (err) {
            console.log(err);
            res.status(404).send(err);
          } else {
            console.log('resultsTwo :', resultsTwo);
            var resultsFormatted = {product_id: req.params.id, ratings: {}, recommended: {}, characteristics: {}}
            for (var i = 0; i < resultsTwo.length; i++) {
              var characteristicName = resultsTwo[i].name;
              var characteristicId = resultsTwo[i].id
              resultsFormatted.characteristics[characteristicName] = {id: characteristicId, value: null}
            }

            for (var i = 0; i < results.length; i++) {
              let recommended = results[i].recommended;
              let rating = results[i].rating;
              let characteristicIds = results[i].characteristic_id.split(',')
              let characteristicValues = results[i].characteristic_values.split(',')

              // summing ratings
              if (resultsFormatted.ratings[rating] === undefined) {
                resultsFormatted.ratings[rating] = 1;
              } else {
                resultsFormatted.ratings[rating]++;
              }
              // summing reccomended
              if (resultsFormatted.recommended[recommended] === undefined) {
                resultsFormatted.recommended[recommended] = 1;
              } else {
                resultsFormatted.recommended[recommended]++;
              }
              // for (var j = 0; j < characteristicIds.length; j++) {
              //   resultsFormatted.characteristics['id'] = characteristicIds[j];
              //   resultsFormatted.characteristics['value'] = characteristicValues[j];
              // }
            }
            res.status(200).send(resultsFormatted);
          }
        })
      }
    })
  }
  // post review (NEED TO ADD REVIEW AND ALSO UPDATE TABLE)
  // change helpfulness
}

module.exports = controller;
