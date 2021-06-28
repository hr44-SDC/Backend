let express = require("express");
let Router = express.Router();
let controller = require("./controller.js");

Router
  .route('/reviews/:id')
    .get(controller.getReview)

module.exports = Router;