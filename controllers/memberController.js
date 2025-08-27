const db = require("../db/queries");

function getMemberForm (req, res) {
  res.render("member", { incorrect: false });
}

async function postMemberForm (req, res) {
  if (req.body.pw === "member") {
    await db.setMember(req.user.id);
    res.redirect("/")
  } else {
    res.render("member", { incorrect: true })
  }
}

module.exports = {
  getMemberForm,
  postMemberForm
}