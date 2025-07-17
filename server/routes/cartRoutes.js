const express = require("express");
const cartController = require("../controllers/cartController");
const verifyToken = require("../middlewares/verifyToken");

const cartRouter = express.Router();

cartRouter.get("/cart", verifyToken, cartController.getCart);
cartRouter.get(
  "/add-to-cart/:productId",
  verifyToken,
  cartController.addToCart
);
cartRouter.get(
  "/remove-from-cart/:productId",
  verifyToken,
  cartController.removeFromCart
);
cartRouter.get(
  "/delete-from-cart/:productId",
  verifyToken,
  cartController.deleteFromCart
);

module.exports = cartRouter;
