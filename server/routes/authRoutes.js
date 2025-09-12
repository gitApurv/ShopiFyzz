const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);
authRouter.post("/forgot", authController.forgotPassword);
authRouter.post("/reset/:resetToken", authController.resetPassword);

module.exports = authRouter;
