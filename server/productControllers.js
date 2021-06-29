const productDetailsDBHelpers = require('../db/productDetails/productDetailsDBHelpers.js');

const productControllers = {
  getAll: (req, res) => {
    productDetailsDBHelpers.getAll((err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  },

  getOneProduct: (req, res) => {
    productDetailsDBHelpers.getOneProduct(req, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        let features = [];
        for (let i = 0; i < results.rows.length; i++) {
          let newFeature = results.rows[i].feature;
          let newFeatureValue;
          let feature;
          if (results.rows[i].featurevalue === 'null') {
            feature = {
              feature: newFeature,
              value: null
            }
          } else {
            newFeatureValue = results.rows[i].featurevalue
            feature = {
              feature: newFeature,
              value: newFeatureValue
            }
          }
          features.push(feature);
        }

        let productResult = {
          id: results.rows[0].productid,
          name: results.rows[0].name,
          slogan: results.rows[0].slogan,
          description: results.rows[0].description,
          category: results.rows[0].category,
          features: features
        }
        res.status(200).send(productResult)
      }
    })
  }
}

module.exports = productControllers;