const express = require("express");
const productController = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/products", productController.getAllProducts);
productRouter.get("/product/:productId", productController.getProduct);

module.exports = productRouter;
