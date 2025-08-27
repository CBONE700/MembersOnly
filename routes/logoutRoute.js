const { Router } = require("express");
const logoutController = require("../controllers/logoutController");
const isAuth = require("../lib/authMiddleware").isAuth;

const logoutRoute = Router();

logoutRoute.get("/", isAuth, logoutController.logUserOut)

module.exports = logoutRoute;