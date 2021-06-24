const csv = require('csv-parser')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const results = [];


fs.createReadStream('questions.csv')
  .pipe(csv({}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // convert dates
    for (var i = 0; i < results.length; i++) {
      var formattedDate = new Date(results[i].date_written*1000).toLocaleDateString("en-US")
      results[i].date_written = formattedDate
    }
    console.log(results[0])
  })

  const csvWriter = createCsvWriter({
    path: '../data',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'}
    ]
});

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });