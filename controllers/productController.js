const Product = require("../models/Product");

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId).populate("user");
  res.status(200).json(product);
};
