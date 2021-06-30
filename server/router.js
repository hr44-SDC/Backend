let express = require("express");
let Router = express.Router();
let controller = require("./controller.js");

Router
  .route('/reviews/:id')
    .get(controller.getReview)
Router
  .route('/ratings/:id')
    .get(controller.getRatings)
Router
  .route('/newReview')
    .post(controller.postReview)

module.exports = Router;