const express = require("express");
const verifyToken = require("./verifyToken");

const check = express.Router();

check.use("/check", verifyToken, (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      isLoggedIn: true,
    });
  } else
    res.status(200).json({
      isLoggedIn: false,
    });
});

module.exports = check;
