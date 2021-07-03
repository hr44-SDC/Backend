const router = require('express').Router();
const productQueries = require('./productQueries.js');

router
  .route('/products')
    .get(productQueries.getAll)

router
  .route('/products/:id')
    .get(productQueries.getOneProduct)

router
  .route('/products/:id/styles')
    .get(productQueries.getProductStyles)

router
  .route('/products/:id/:userSession')
    .post(productQueries.addToCart)

// router
//   .route('loaderio-14292b836f7d95ef61fccf0cc57df915.txt')
//     .get(function (req, res) {
//       res.status(200).send('loaderio-14292b836f7d95ef61fccf0cc57df915.txt')
//     })

module.exports = router;