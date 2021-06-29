const client = require('../db/index.js')

var controllers1 = {
  getQuestions: async (req, response) => {
    try {
      var id = req.params.product_id
      // select all questions under that product id
      var questionsQuery = `Select question_id, question_body, question_date, asker_name, question_helpfulness, question_reported FROM questions WHERE question_reported = 0 AND product_id = ${id}`
      const resQuestion = await client.query(questionsQuery)
      var qdata = resQuestion.rows;
      let results = {
        "product_id": id,
        "results": []
      }
      for (var i = 0; i < qdata.length; i++) {
        var questionObj = {}
        questionObj["question_id"] = qdata[i].question_id;
        questionObj["question_body"] = qdata[i].question_body;
        questionObj["question_date"] = new Date(parseInt(qdata[i].question_date));
        questionObj["asker_name"] = qdata[i].asker_name;
        questionObj["question_helpfulness"] = qdata[i].question_helpfulness;
        questionObj["reported"] = qdata[i].question_reported;
        questionObj["answers"] = {};
        var answersQuery = `SELECT answer_id, answer_body, answer_date, answerer_name, answer_reported, answer_helpfulness FROM answers WHERE question_id = ${qdata[i].question_id}`
        var resAnswer = await client.query(answersQuery)
        var aData = resAnswer.rows;
        for (var j = 0; j < aData.length; j++) {
          questionObj["answers"][aData[j]["answer_id"]] = {}
          questionObj["answers"][aData[j]["answer_id"]]["id"] = aData[j].answer_id;
          questionObj["answers"][aData[j]["answer_id"]]["body"] = aData[j].answer_body;
          questionObj["answers"][aData[j]["answer_id"]]["date"] = new Date(parseInt(aData[j].answer_date));
          questionObj["answers"][aData[j]["answer_id"]]["answerer_name"] = aData[j].answerer_name;
          questionObj["answers"][aData[j]["answer_id"]]["helpfulness"] = aData[j].answer_helpfulness;
          // run photos query and push results into above array
          var photosQuery = `SELECT id, url FROM photos WHERE answer_id = ${aData[j].answer_id}`
          var resPhoto = await client.query(photosQuery)
          var pData = resPhoto.rows
          questionObj["answers"][aData[j]["answer_id"]]["photos"] = pData
        }
        results.results.push(questionObj)
      }
      response.status(200).send(results)
    }
    catch (err) {
      response.status(400).send(err)
    }
  },
  submitQuestion: (req, response) => {
    //path: /qa/questions
    var { body, name, email, product_id } = req.body
    var queryStr = `INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, question_helpfulness, question_reported) VALUES (nextval('question_id_sequence'), ${product_id}, '${body}', ${new Date().getTime()}, '${name}', '${email}', 0, 0)`
    // console.log(queryStr)
    client.query(queryStr, (err, res) => {
      if (err) {
        response.status(400).send(err)
      } else {
        response.status(200).send(`question added to db`)
      }
    })
  },
  submitAnswer: async (req, response) => {
    //path: /qa/questions/:question_id/answers
    try {
      var { body, name, email, photos } = req.body
      var id = req.params.question_id
      var answerQueryStr = `INSERT INTO answers (answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported, answer_helpfulness)
      VALUES (nextval('answer_id_sequence'), ${id}, '${body}', ${new Date().getTime()}, '${name}', '${email}', 0, 0) RETURNING answer_id`
      var queryReturn = await client.query(answerQueryStr);
      var newAnswerId = queryReturn.rows[0].answer_id;
      if (photos.length > 0) {
        for (var i = 0; i < photos.length; i++) {
          var photoQueryStr = `INSERT INTO  photos (id, answer_id, url) VALUES (nextval('photo_id_sequence'), ${newAnswerId}, '${photos[i]}') RETURNING *`
          var otherQueryReturn = await client.query(photoQueryStr)
        }
      }
      response.status(200).send('answer and associated photos have been added to the database')
    }
    catch (err) {
      response.status(400).send(err)
    }
  },
  updateHelpfulness: (req, response) => {
    //path: /qa/questions/:question_id/helpful
    //path: /qa/answers/:answer_id/helpful
    var helpfulness = req.body.questionHelpfulness || req.body.answerHelpfulness;
    console.log(helpfulness)
    var id = req.params.id_to_update
    var category = req.params.category
    var shortenedCategory = category.slice(0, category.length-1)
    var queryStr = `UPDATE ${category} SET ${shortenedCategory}_helpfulness = ${helpfulness} WHERE ${shortenedCategory}_id = ${id};`;
    console.log(queryStr)
    client.query(queryStr, (err, res) => {
      if (err) {
        response.status(400).send(err)
      } else {
        response.status(201).send(`${category} w/ id ${id} has an updated helpfulness of ${helpfulness}`)
      }
    })
  }

}

module.exports = controllers1

