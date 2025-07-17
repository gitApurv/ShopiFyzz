const express = require("express");
const orderController = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");

const orderRouter = express.Router();

orderRouter.get("/orders", verifyToken, orderController.getOrders);
orderRouter.get(
  "/order/:orderId",
  verifyToken,
  orderController.getOrderDetails
);
orderRouter.get("/create-order", verifyToken, orderController.createOrder);
orderRouter.get(
  "/download-receipt/:orderId",
  verifyToken,
  orderController.downloadReceipt
);

module.exports = orderRouter;
