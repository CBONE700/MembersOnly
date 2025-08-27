const { Pool } = require("pg");

//Create a new pool to be used... Note that this is able to be done as
//the .env file is configured in app.js before this is created
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})