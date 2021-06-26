const fs = require('fs');
const fastcsv = require('fast-csv');
const Pool = require('pg').Pool;

let stream = fs.createReadStream('./data/product.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function(data) {
    csvData.push(data);
  })
  .on('end', function() {
    csvData.shift();

    const Pool = new Pool ({
      host: 'localhost',
      user: 'postgres',
      datbase: 'productdetails',
      password: 'hello',
      port: 5432
    })
  })
stream.pipe(csvStream);