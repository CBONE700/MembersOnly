require("dotenv").config();
const express = require('express');
const path = require("node:path");
const session = require('express-session');
const passport = require('passport');
const pool = require('./db/pool');
const db = require('./db/queries');

const pgSession = require('connect-pg-simple')(session);

//Require in dotenv at the beginning of app so that it is passed through to the db sections

//Create overarching express app
const app = express();

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Database connected ✅", res.rows[0]);
});

console.log("App starting...");
console.log("PORT is:", process.env.PORT || "not set (using fallback 3000)");
console.log("SECRET is:", process.env.SECRET ? "defined ✅" : "missing ❌");

//Require in the routes for the app to use
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const memberRoute = require("./routes/memberRoute");
const createmessageRoute = require("./routes/createmessageRoute");

//Set up views middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

//Session Setup
app.use(session({
  store: new pgSession({
    pool: pool,
    createTableIfMissing: true,
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
app.get("/", async (req, res) => {
  if (req.user) {
    const messages = await db.getMessages();
    res.render("members_only", { user: req.user.username, member: req.user.membership_status, messages: messages });
  } else {
    res.render("index");
  }
});

//Set route middleware
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/member", memberRoute);
app.use("/createmessage", createmessageRoute);

//Run the app
const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', (error) => {
  if (error) {
    throw error;
  };
  console.log(`Listening on port ${PORT}`);
});
