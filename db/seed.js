// const fs = require("fs");
// const fastcsv = require("fast-csv");
// // const db = require("./connection.js");

// let stream = fs.createReadStream("./reviews.csv")
// csvData = [];

// let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     console.log('pushing');
//     csvData.push(data);
//   })
//   .on("end", function() {
//     // remove the first line: header
//     csvData.shift();
//     console.log('hi')
//     console.log(csvData);

//     // connect to the MySQL database
//     // save csvData
//   });

// stream.pipe(csvStream);





-- run command: mysql --local-infile=1 -u root -p < seed.sql