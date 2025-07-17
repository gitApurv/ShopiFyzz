const express = require("express");
const adminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = express.Router();

adminRouter.get("/products", verifyToken, adminController.getAdminProducts);
adminRouter.get(
  "/product/:productId",
  verifyToken,
  adminController.getAdminProduct
);
adminRouter.post("/add-product", verifyToken, adminController.addProduct);
adminRouter.put(
  "/edit-product/:productId",
  verifyToken,
  adminController.editProduct
);
adminRouter.delete(
  "/delete/:productId",
  verifyToken,
  adminController.deleteProduct
);

module.exports = adminRouter;
