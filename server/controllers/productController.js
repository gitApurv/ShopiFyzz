const Product = require("../models/Product");

exports.getPageCount = async (req, res, next) => {
  const productsPerPage = 8;
  const productsCount = await Product.countDocuments();
  const pageCount = Math.ceil(productsCount / productsPerPage);
  res.status(200).json({ pageCount: pageCount });
};

exports.getProducts = async (req, res, next) => {
  const { pageNo } = req.params;
  const products = await Product.find({})
    .skip((pageNo - 1) * productsPerPage)
    .limit(productsPerPage);
  res.status(200).json(products);
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId).populate("user");
  res.status(200).json(product);
};
