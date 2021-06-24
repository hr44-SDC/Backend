const csv = require("csv-parse");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "product_id", title: "product_id" },
    { id: "body", title: "q_body" },
    { id: "date_written", title: "q_date" },
    { id: "asker_name", title: "asker" },
    { id: "asker_email", title: "asker_email" },
    { id: "reported", title: "q_reported" },
    { id: "helpful", title: "q_helpful" },
  ],
});

let readStream = fs.createReadStream("questions.csv");
let writeStream = fs.createWriteStream("../data/cleanQuestions.csv");

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {

    // converts timestamp to date (i.e 1210981217 => 5/16/2008)
    let date = new Date(chunk.date_written*1000).toLocaleDateString("en-US")

    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}



// unix timestamp conversion
// var unixTime = 1210981217;
// var date = new Date(unixTime*1000).toLocaleDateString("en-US");
//expected: "5/16/2008"

const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });