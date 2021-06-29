const connection = require('./connection.js');

const productDetailsDBHelpers = {
  getAll: (callback) => {
    let queryStr = `SELECT * FROM products WHERE productId = 500`;

    connection.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  },

  getOneProduct: (req, callback) => {
    let {id} = req.params;
    console.log(id)

    let queryStr = `SELECT * FROM products, features WHERE products.productId = ${id} AND features.productId = ${id}`;

    connection.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  }
}

module.exports = productDetailsDBHelpers;

// productId, name, slogan, description, category, defaultPrice, feature, featureValue