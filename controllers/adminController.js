const Product = require("../models/Product");
const User = require("../models/User");

exports.getAdminProducts = async (req, res, next) => {
  const userId = req.user.id;
  const products = await Product.find({ user: userId });
  res.status(200).json(products);
};

exports.getAdminProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  res.status(200).json(product);
};

exports.addProduct = async (req, res, next) => {
  const userId = req.user.id;
  const productData = req.body;
  const updatedProductData = { ...productData, user: userId };
  const product = await Product.create(updatedProductData);
  res.status(201).json({
    ok: true,
    message: "Product created successfully",
  });
};

exports.editProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const productData = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);
  let updatedProductData = {
    ...productData,
    user: userId,
    image: productData.image || product.image,
  };
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedProductData
  );
  res.status(200).json({
    ok: true,
    message: "Product edited successfully",
  });
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  const user = await User.findById(userId);
  const cart = user.cart;
  const updatedCart = cart.filter(
    (cartProduct) => cartProduct.product.toString() !== productId.toString()
  );
  const updatedUser = await User.findByIdAndUpdate(userId, {
    $set: { cart: updatedCart },
  });
  const response = await Product.findByIdAndDelete(productId);
  res.status(200).json({
    ok: true,
    message: "Product deleted successfully",
  });
};
