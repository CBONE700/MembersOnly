const express = require('express');
const path = require("node:path");
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const PGStore = require('connect-pg-simple')(session);

//Require in dotenv at the beginning of app so that it is passed through to the db sections
require("dotenv").config();

//Create overarching express app
const app = express();

//Require in the signup route for the app to use
const signupRoute = require("./routes/signupRoute");

//Set up views middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

//Set startup index
app.get("/", (req, res) => {
  res.render("index")
});

//Set signup index middleware
app.use("/signup", signupRoute);

//Run the app
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  };
  console.log(`Listening on port ${PORT}`);
});
