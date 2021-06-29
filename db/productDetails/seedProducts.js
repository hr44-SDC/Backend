const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');

//create reading stream using fs.createReadStream(). This creates an object that will 'pipe' a CSV parser stream object generated from the fast-csv.parse method
let stream = fs.createReadStream('../data/product.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function(data) {
    // triggered when a record is parsed
    csvData.push(data);
  })
  .on('end', function() {
    csvData.shift();

    const pool = new Pool({
      host: 'localhost',
      user: 'austinyeon',
      database: 'productdetails',
      password: 'sdc',
      port: 5432
    })

    const query = "INSERT INTO products (productId, name, slogan, description, category, defaultPrice) VALUES ($1, $2, $3, $4, $5, $6)";

    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log('inserted ' + res.rowCount + ' row:', row);
            }
          })
        });
      } finally {
        // done();
      }
    });
  });

stream.pipe(csvStream);