const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const tableName = 'products';
let allRows = [];



// const csvStringifier = createCsvStringifier({
//   header: [
//     {id: 'id', title: 'id'},
//     {id: 'name', title: 'name'},
//     {id: 'slogan', title: 'slogan'},
//     {id: 'description', title: 'description'},
//     {id: 'category', title: 'category'},
//   ],
// });

// let readStream = fs.createReadStream('./data/product.csv');
// let writeStream = fs.createWriteStream('./data/cleanproducts.csv');

// class CSVCleaner extends Transform {
//   constructor(options) {
//     super(options);
//   }
// }

// _transform(chunk, encoding, next) {
//   for (let key in chunk) {
//     let trimKey = key.trim();
//     chunk[trimKey] = chunk[key];
//     if (key !== trimKey) {
//       delete chunk[key];
//     }
//   }
//   chunk = csvStringifier.stringifyRecords([chunk]);
//   this.push(chunk);
//   next();
// }