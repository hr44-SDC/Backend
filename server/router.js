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

module.exports = router;