const db = require("../db/queries");
const genPassword = require("../lib/passwordUtils").genPassword;

//Render the signup form on get request
function getSignupForm (req, res) {
  res.render("signup", {unameCheck: false});
}

//Submit and handle user data on post request
async function postUserData (req, res) {
    const unameCheck = await db.checkUsernameExists(req.body.username);
    //If the username exists then re-render the signup form and let them know that they need to choose another username
    //else place the username in the database
    if (unameCheck) {
      res.render("signup", {unameCheck: true});
    }
    console.log(unameCheck);
    const pw = genPassword(req.body.password);
    await db.insertUser(req.body.username, pw.hash, pw.salt);
    res.redirect("/");
}

module.exports = {
  getSignupForm,
  postUserData
}