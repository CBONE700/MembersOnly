const express = require('express');
const path = require("node:path");
const pool = require('./db/pool.js');
const session = require('express-session');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;

const PGStore = require('connect-pg-simple')(session);

require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("hello")
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  };
  console.log(`Listening on port ${PORT}`);
});
