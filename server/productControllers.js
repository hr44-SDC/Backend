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
            };
          } else {
            newFeatureValue = results.rows[i].featurevalue;
            feature = {
              feature: newFeature,
              value: newFeatureValue
            };
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
        };
        res.status(200).send(productResult);
      }
    })
  },

  getProductStyles: (req, res) => {
    productDetailsDBHelpers.getProductStyles(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        let stylesArray = results.rows;
        let stylesResults = [];
        let skus = [];

        for (let i = 0; i < stylesArray.length; i++) {
          let defaultstyle = false;
          if (stylesArray[i].defaultstyle === 1) {
            defaultstyle = true;
          }
          let defaultkey = 'default?'
          let newStyle = {
            style_id: stylesArray[i].styleid,
            name: stylesArray[i].stylename,
            original_price: stylesArray[i].originalprice,
            sale_price: stylesArray[i].saleprice,
            [defaultkey]: defaultstyle
          }
          productDetailsDBHelpers.getProductSizes(stylesArray[i].styleid, (err, results) => {
            if (err) {
              res.status(400).send(err);
            } else {
              for (let j = 0; j < results.rows.length; j++) {
                let sizeAndQuantity = {
                  [results.rows[i].id]: {
                    quantity: results.rows[i].quantity,
                    size: results.rows[i].size
                  }
                }
                newStyle.skus = sizeAndQuantity
              }
            }
          })
          stylesResults.push(newStyle);
        }

        let productResult = {
          product_id: results.rows[0].productid,
          results: stylesResults
        }
        res.status(200).send(productResult);
      }
    })

  }
}

module.exports = productControllers;