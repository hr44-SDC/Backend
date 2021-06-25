const router = require('express').Router();
const controllers = require('./controller.js');

router
  .route('/qa/questions/:product_id')
  .get(controllers.getQuestions)

module.exports = router;