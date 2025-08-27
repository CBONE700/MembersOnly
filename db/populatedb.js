const { Client } = require("pg");
require('dotenv').config();

//Create db... Need to reconfigure .env here as this is a separate module that is run entirely separately from the app
//and thus does not get called from the app.js entry point or anywhere else in the app
const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    membership_status BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()  
  );

  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    username TEXT REFERENCES users(username)
  );
`;

async function main() {
  console.log("...seeding");
  const client = new Client({
    connectionString: `postgresql://${process.env.NAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DB}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
};

main();