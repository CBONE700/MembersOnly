const { Router } = require("express");
const passport = require("passport");
const loginController = require("../controllers/loginController");

const loginRoute = Router();

loginRoute.get("/", loginController.getLoginForm);
loginRoute.post("/", passport.authenticate('local', { failureRedirect: '/signup', successRedirect: '/' }));

module.exports = loginRoute;