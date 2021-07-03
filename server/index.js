const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');

const app = express();
const port = 3003;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router)

app.use('/loaderio-d0f0ee1d32e118fca8db6a99900c711d/', (req, res) => {
    res.status(200).send('loaderio-d0f0ee1d32e118fca8db6a99900c711d')
})

app.use('/loaderio-d0f0ee1d32e118fca8db6a99900c711d.txt', (req, res) => {
  res.status(200).send('loaderio-d0f0ee1d32e118fca8db6a99900c711d')
})



app.listen(port, () => console.log(`listening on ${port}`))