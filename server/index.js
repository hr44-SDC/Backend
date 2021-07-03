const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/loaderio-14292b836f7d95ef61fccf0cc57df915/', function (req, res) {
  res.status(200).send('loaderio-14292b836f7d95ef61fccf0cc57df915')
})

app.use('/api', router)


app.listen(port, () => console.log(`listening on ${port}`))
