const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  host: process.env.localhost,
  user: process.env.postgres,
  database: process.env.atelier-raw,
  password: process.env,
  port: process.env.5432
}