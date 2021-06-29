const router = require('express').Router();
const productControllers = require('./productControllers.js');

router
  .route('/products')
    .get(productControllers.getAll)

router
  .route('/products/:id')
    .get(productControllers.getOneProduct)


module.exports = router;