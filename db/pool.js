const { Pool } = require("pg");

//Create a new pool to be used... Note that this is able to be done as
//the .env file is configured in app.js before this is created
module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.NAME,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT
})