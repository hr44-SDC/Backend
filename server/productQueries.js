const connection = require('../db/productDetails/connection.js');

const productQueries = {
  getAll: function (req, res) {
    let queryStr = `SELECT * FROM products`;

    connection.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(results);
      }
    })
  },

  getOneProduct: function (req, res) {
    let { id } = req.params;
    let queryStr = `SELECT * FROM products, features WHERE products.productId = ${id} AND features.productId = ${id}`;

    connection.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
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

  getProductStyles: async function (req, res) {
    try {
      let { id } = req.params;
      let queryStr = `SELECT * FROM products, styleAndPrice WHERE products.productId = ${id} AND styleAndPrice.productId = ${id}`;
      let styleRes = await connection.query(queryStr);
      if (styleRes.rows.length < 1) {
        let noStylesResult = {
          product_id: id,
          results: []
        }
        res.status(200).send(noStylesResult)
      } else {
        let stylesArray = styleRes.rows;
        let stylesResults = [];
        let skus = {};

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
            [defaultkey]: defaultstyle,
            skus: skus
          }
          stylesResults.push(newStyle);
        }
        let productResult = {
          product_id: stylesArray[0].productid,
          results: stylesResults
        }
        res.status(200).send(productResult);
      }
    } catch (err) {
      console.log(err)
    }

    // try and catch block
    // await connection.query(queryStr, (err, results) => {
    //   if (err) {
    //     res.status(404).send(err);
    //   } else {
    //     console.log('results:', results);
    //     let stylesArray = results.rows;
    //     let stylesResults = [];
    //     let skus = {};

    //     for (let i = 0; i < stylesArray.length; i++) {
    //       let defaultstyle = false;
    //       if (stylesArray[i].defaultstyle === 1) {
    //         defaultstyle = true;
    //       }
    //       let defaultkey = 'default?'
    //       let newStyle = {
    //         style_id: stylesArray[i].styleid,
    //         name: stylesArray[i].stylename,
    //         original_price: stylesArray[i].originalprice,
    //         sale_price: stylesArray[i].saleprice,
    //         [defaultkey]: defaultstyle,
    //         skus: skus
    //       }
    //       stylesResults.push(newStyle);

    //       let queryStr2 = `SELECT * FROM sizeAndQuantity WHERE styleId = ${stylesArray[i].styleid}`;
    //       connection.query(queryStr2, (err, results2) => {
    //         if (err) {
    //           res.status(404).send(err);
    //         } else {
    //           for (let j = 0; j < results2.rows.length; j++) {
    //             let uniqueId = results2.rows[i].id;
    //             skus[uniqueId] = {
    //               quantity: results2.rows[i].quantity,
    //               size: results2.rows[i].size
    //             }
    //           }
    //         }
    //       })
    //     }
    //     let productResult = {
    //       product_id: results.rows[0].productid,
    //       results: stylesResults
    //     }
    //     res.status(200).send(productResult);
    //   }
    // })
  }
}

module.exports = productQueries;