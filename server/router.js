const router = require('express').Router();
const controllers = require('./controller.js');
const controllers1 = require('./controller1.js');

router
  .route('/qa/questions/:product_id')
    .get(controllers1.getQuestions)

router
  .route('/qa/questions')
    .post(controllers1.submitQuestion)

router
  .route('/qa/questions/:question_id/answers')
    .post(controllers1.submitAnswer)

router
  .route('/qa/:category/:id_to_update/helpful')
    .put(controllers1.updateHelpfulness)



module.exports = router;