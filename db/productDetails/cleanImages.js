const csv = require('csv-parse');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const es = require('event-stream');

var csv


// const csvStringifier = createCsvStringifier({
//   header: [
//     {id: 'id', title: 'id'},
//     {id: 'styleId', title: 'styleId'},
//     {id: 'mainUrl', title: 'mainUrl'},
//     {id: 'thumbnailUrl', title: 'thumbnailUrl'}
//   ],
// });

// const newCsv = fs.createWriteStream('db/data/cleanedexample.csv');

// fs.createReadStream('db/data/example.csv')
//   .pipe(es.split())
//   .pipe(
//     es.mapSync(function(line) {
//       let lastCharacter = line[line.length-1];
//       if (lastCharacter !== '"') {
//         line + '"';
//       }
//       newCsv.write(line)
//     })
//   )
// newCsv.end();


