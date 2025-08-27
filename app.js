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
const logoutRoute = require("./routes/logoutRoute");
const memberRoute = require("./routes/memberRoute");

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

//Set startup index
app.get("/", (req, res) => {
  if (req.user) {
    res.render("members_only", { user: req.user.username });
  } else {
    res.render("index");
  }
});

//Set route middleware
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/member", memberRoute);

//Run the app
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  };
  console.log(`Listening on port ${PORT}`);
});
