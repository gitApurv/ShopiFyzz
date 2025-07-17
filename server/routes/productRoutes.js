const express = require("express");
const productController = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/productsCount", productController.getPageCount);
productRouter.get("/products/:pageNo", productController.getProducts);
productRouter.get("/product/:productId", productController.getProduct);

module.exports = productRouter;
