const { Router } = require("express");
const createmessageController = require("../controllers/createmessageController");
const isMemeber = require("../lib/authMiddleware").isMember;

const createMessageRoute = Router();

createMessageRoute.get("/", isMemeber, createmessageController.getMessageForm);
createMessageRoute.post("/", isMemeber, createmessageController.postMessageForm);

module.exports = createMessageRoute;