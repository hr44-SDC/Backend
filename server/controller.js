const db = require('../db/connection_two.js');
const moment = require('moment')

let controller = {
  getReview: (req, res) => {
    var queryString = `SELECT reviews.*, GROUP_CONCAT(reviews_photos.photo_url) AS photos FROM reviews LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = ${req.params.id} GROUP BY reviews.id`
    db.query(queryString, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log(results);
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
            results[i]['response'] = null;
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
            var characteristicsJoined = {}
            for (var i = 0; i < results.length; i++) {
              let recommended = results[i].recommended;
              let rating = results[i].rating;
              console.log(results[i]);
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
              for (var j = 0; j < characteristicIds.length; j++) {
                if (characteristicsJoined[characteristicIds[j]] === undefined) {
                  characteristicsJoined[characteristicIds[j]] = characteristicValues[j];
                } else {
                  characteristicsJoined[characteristicIds[j]] += ' ' + characteristicValues[j];
                }
              }
            }
            console.log(results);
            console.log(characteristicsJoined);

            for (var i = 0; i < resultsTwo.length; i++) {
              var characteristicName = resultsTwo[i].name;
              var characteristicId = resultsTwo[i].id
              var averageValue = characteristicsJoined[characteristicId].split(' ').reduce((a, b) => Number(a) + Number(b))/characteristicsJoined[characteristicId].length;
              console.log(averageValue);
              resultsFormatted.characteristics[characteristicName] = {id: characteristicId, value: averageValue}
            }
            res.status(200).send(resultsFormatted);
          }
        })
      }
    })
  },
  postReview: (req, res) => {
    var date = Date.now();
    console.log('DATE: ', date);
    var queryString = `INSERT INTO reviews
    (product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness)
    VALUES (${req.body.product_id}, "${req.body.rating}", ${date}, "${req.body.summary}", "${req.body.body}", "${req.body.recommend}", "false",
    "${req.body.name}", "${req.body.email}", "null", 0);`
    db.query(queryString, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        var characteristicsFormatted = [];
        for (var key in req.body.characteristics) {
          characteristicsFormatted.push([Number(key), results.insertId, Number(req.body.characteristics[key])])
        }
        characteristicsFormatted = [characteristicsFormatted];
        console.log(characteristicsFormatted);
        // performed a bulk insert: https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js
        var queryString = 'INSERT INTO characteristics_reviews (characteristic_id, review_id, value) VALUES ?'
        db.query(queryString, characteristicsFormatted, (err, response) => {
          if (err) {
            console.log(err);
            res.status(404).send(err);
          } else {
            res.status(200).send(response);
          }
        })
      }
    })
  },
  updateHelpfulness: (req, res) => {
    var queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE reviews.id = ${req.params.id}`
    db.query(queryString, (err, response) => {
      if (err) {
        console.log(err);
        res.status(404).send('err');
      } else {
        console.log(response);
        res.status(200).send(response);
      }
    })
  }
}

module.exports = controller;

/*
NOTE: there is a problem with the frontend post request:
even if you type in all of the characteristics, the only characteristics that get sent to the server are the ones that already exist in the database.
This is a problem: there is no way to create a new characteristic id and actually have it work with the front end (because you are not actually recieving the data).


EXAMPLE OF JSON OBJECT TO USE IN POSTMAN:

{
    "product_id": 1,
    "rating": 5,
    "summary": "Writing product sumamry text",
    "body": "Writing body sumamry text. Writing body sumamry text. Writing body sumamry text. Writing body sumamry text. Writing body sumamry text. Writing body sumamry text. Writing body sumamry text. Writing body sumamry text.",
    "recommend": false,
    "name": "Dorcas45",
    "email": "Aurelio_Rice27@hotmail.com",
    "response": "",
    "photos": [
        "https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
    ],
    "characteristics": {
        "1": 2,
        "2": 4,
        "3": 5,
        "4": 4
    }
}
*/