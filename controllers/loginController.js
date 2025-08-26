const db = require("../db/queries");

async function getLoginForm (req, res) {
  res.render("login");
}

module.exports = {
  getLoginForm,
}