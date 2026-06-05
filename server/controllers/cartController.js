const User = require("../models/User");

exports.getCart = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate("cart.product");
  const cart = user.cart;
  res.status(200).json(cart);
};

exports.addToCart = async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  const user = await User.findById(userId);
  const cart = user.cart;

  const cartProductIndex = cart.findIndex((cp) => {
    return cp.product.toString() === productId.toString();
  });

  const updatedCart = [...cart];

  if (cartProductIndex >= 0) {
    updatedCart[cartProductIndex].quantity += 1;
  } else {
    updatedCart.push({
      product: productId,
      quantity: 1,
    });
  }

  await User.findByIdAndUpdate(userId, {
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
  const cart = user.cart;

  const cartProductIndex = cart.findIndex((cp) => {
    return cp.product.toString() === productId.toString();
  });

  if (cartProductIndex === -1) {
    return res.status(404).json({
      ok: false,
      message: "Product not found in cart",
    });
  }

  const updatedCart = [...cart];
  updatedCart[cartProductIndex].quantity -= 1;

  await User.findByIdAndUpdate(
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
  const cart = user.cart;

  const updatedCart = cart.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { cart: updatedCart } }
  );

  res.status(200).json({
    ok: true,
    message: "Deleted from cart",
  });
};
