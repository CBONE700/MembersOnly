const { Router } = require("express");
const memberController = require("../controllers/memberController");
const isAuth = require("../lib/authMiddleware").isAuth;

const memberRoute = Router();

memberRoute.get("/", isAuth, memberController.getMemberForm);
memberRoute.post("/", isAuth, memberController.postMemberForm);

module.exports = memberRoute;