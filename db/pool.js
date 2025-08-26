const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.NAME,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT
})