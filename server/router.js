const router = require('express').Router();
const controllers = require('./controller.js');
const controllers1 = require('./controller1.js');

router
  .route('/qa/questions/:product_id')
  .get(controllers1.getQuestions)

module.exports = router;