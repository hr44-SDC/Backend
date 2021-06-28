

/*  working code with large join statement

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

