const { Router } = require("express");
const signupController = require("../controllers/signupController");

//Create signup route
const signupRoute = Router();

//Create get and post middleware for rendering and submitting signup form
signupRoute.get("/", signupController.getSignupForm);
signupRoute.post("/", signupController.postUserData);

module.exports = signupRoute;