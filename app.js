require("dotenv").config();
const express = require('express');
const path = require("node:path");
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const pool = require('./db/pool');

const pgSession = require('connect-pg-simple')(session);

//Require in dotenv at the beginning of app so that it is passed through to the db sections

//Create overarching express app
const app = express();

//Require in the routes for the app to use
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");

//Set up views middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

//Session Setup
app.use(session({
  store: new pgSession({
    pool: pool,
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

//Passport Auth Setup
require('./config/passport');

app.use(passport.session());
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

//Set startup index
app.get("/", (req, res) => {
  res.render("index")
});

//Set route middleware
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

//Run the app
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  };
  console.log(`Listening on port ${PORT}`);
});
