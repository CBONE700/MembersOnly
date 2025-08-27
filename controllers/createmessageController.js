const db = require("../db/queries");

function getMessageForm (req, res) {
  res.render("createmessage");
}

async function postMessageForm (req, res) {
  await db.insertMessage(req.body.title, req.body.message, req.user.username);
  res.redirect("/");
}

module.exports = {
  getMessageForm,
  postMessageForm
}