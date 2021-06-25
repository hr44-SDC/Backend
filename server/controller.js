const client = require('../db/index.js')
var controllers = {
  getQuestions: (req, response) => {
    var id = req.params.product_id
    // select all questions under that product id
    var questionsQuery = `Select question_id, question_body, question_date, asker_name, question_helpfulness, question_reported FROM questions WHERE product_id = ${id}`
    client
      .query(questionsQuery)
      .then(res => {
        var qdata = res.rows;
        let results = {
          "product_id": "1",
          "results": []
        }
        // iterate through each row
        for (var i = 0; i < qdata.length; i++) {
          // create questionObj
          var questionObj = {}
          // populate temp object with the properties and associated data
          questionObj["question_id"] = qdata[i].question_id;
          questionObj["question_body"] = qdata[i].question_body;
          questionObj["question_date"] = qdata[i].question_date;
          questionObj["asker_name"] = qdata[i].asker_name;
          questionObj["question_helpfulness"] = qdata[i].question_helpfulness;
          questionObj["reported"] = qdata[i].question_reported;
          questionObj["answers"] = {};
          results.results.push(questionObj)
          // run another query for all answers associated with that question id
          // var answersQuery = `SELECT answer_id, answer_body, answerer_name, answerer_email, answer_reported, answer_helpfulness FROM answers WHERE question_id = ${qdata.question_id}`
          // var aData = res.rows
          // // iterate through the rows
          // for (var j = 0; j < aData.length; j++) {
          //   //set answer obj property equal to answer id with an empty obj value
          //   questionObj[answers][aData.answer_id] = {}
          //   //set object values
          //   questionObj[answers][aData.answer_id]["id"] = aData.answer_id;
          //   questionObj[answers][aData.answer_id]["body"] = aData.answer_body;
          //   questionObj[answers][aData.answer_id]["date"] = aData.answer_date;
          //   questionObj[answers][aData.answer_id]["answerer_name"] = aData.answer_name;
          //   questionObj[answers][aData.answer_id]["helpfulness"] = aData.answer_helpfulness;
          //   questionObj[answers][aData.answer_id]["photos"] = []
        }
        // console.log(results)
        response.status(200).send(results)
      })
      .catch(err => {
        res.status(400).send(err)
        // console.error(err);
      })
      // .finally(() => {
      //   client.end();
      // });
  }
}

module.exports = controllers

/* -------------------------------------------------------- working code with large join statement
const client = require('../db/index.js')
var controllers = {
  getQuestions: (req, res) => {
    var id = req.params.id
    var queryStr = `Select q.question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, a.answer_id, a.answer_body, a.answerer_name, a.answerer_email, a.answer_reported, a.answer_helpfulness, p.answer_id, p.url FROM questions AS q LEFT JOIN answers AS a ON q.question_id = a.question_id LEFT JOIN photos AS p ON a.answer_id = p.answer_id AND q.question_reported = 0 AND a.answer_reported = 0 WHERE q.product_id = 1`
    client
      .query(queryStr)
      .then(res => {
        console.log(res.rows);
        let results = {
          "product_id": "1",
          "results": []
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        client.end();
      });

  }
}
*/

