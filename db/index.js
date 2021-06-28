const { Pool, Client} = require('pg')

const config = require('../config.json')


// Getting connectin parameters from config.json
const host = config.host
const user = config.user
const pw = config.pw
const db = config.db
const port = config.port
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`

// Connecting to Database
const client = new Client({
  connectionString: conString,
})

client.connect((err) => {
  if (err) {
    console.log('unsuccessful connection to database')
  } else {
    console.log('successfully connected to database!')
  }
})



module.exports = client;