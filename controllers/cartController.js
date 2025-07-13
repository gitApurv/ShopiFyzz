const User = require("../models/User");
const Product = require("../models/Product");

exports.getCart = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate("cart.items.product");
  const cart = user.cart;
  res.status(200).json(cart);
};

exports.addToCart = async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  const cart = user.cart;
  const updatedTotalPrice = cart.totalPrice + product.price;

  const cartProductIndex = cart.items.findIndex((cp) => {
    return cp.product.toString() === productId.toString();
  });

  const updatedCartItems = [...cart.items];

  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity += 1;
  } else {
    updatedCartItems.push({
      product: productId,
      quantity: 1,
    });
  }

  const updatedCart = {
    totalPrice: updatedTotalPrice,
    items: updatedCartItems,
  };

  const updatedUser = await User.findByIdAndUpdate(userId, {
    $set: { cart: updatedCart },
  });

  res.status(200).json({
    ok: true,
    message: "Added to cart",
  });
};

exports.removeFromCart = async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  const cart = user.cart;
  const updatedTotalPrice = cart.totalPrice - product.price;

  const cartProductIndex = cart.items.findIndex((cp) => {
    return cp.product.toString() === productId.toString();
  });

  const updatedCartItems = [...cart.items];
  updatedCartItems[cartProductIndex].quantity -= 1;

  const updatedCart = {
    totalPrice: updatedTotalPrice,
    items: updatedCartItems,
  };

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { cart: updatedCart } }
  );

  res.status(200).json({
    ok: true,
    message: "Removed from cart",
  });
};

exports.deleteFromCart = async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  const cart = user.cart;

  const cartProductIndex = cart.items.findIndex((cp) => {
    return cp.product.toString() === productId.toString();
  });

  const quantity = cart.items[cartProductIndex].quantity;
  const updatedTotalPrice = cart.totalPrice - quantity * product.price;

  const updatedCartItems = cart.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  const updatedCart = {
    totalPrice: updatedTotalPrice,
    items: updatedCartItems,
  };

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { cart: updatedCart } }
  );

  res.status(200).json({
    ok: true,
    message: "Deleted from cart",
  });
};
