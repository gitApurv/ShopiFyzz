const Order = require("../models/Order");
const User = require("../models/User");

exports.getOrders = async (req, res, next) => {
  const userId = req.user.id;
  const orders = await Order.find({ user: userId }).populate("items.product");
  res.status(200).json(orders);
};

exports.getOrderDetails = async (req, res, next) => {
  const orderId = req.params.orderId;
  const order = await Order.findById(orderId).populate("items.product");
  res.status(200).json(order);
};

exports.createOrder = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  const cart = user.cart;
  const orderDetails = { ...cart, user: userId };
  const updatedCart = { totalPrice: 0, items: [] };
  const updatedUser = await User.findByIdAndUpdate(userId, {
    $set: { cart: updatedCart },
  });
  const order = Order.create(orderDetails);
  res.status(200).json({
    ok: true,
    message: "Order Placed",
  });
};

exports.downloadReceipt = async (req, res, next) => {
  res.status(200).json({
    message: "Receipt generation feature under development",
  });
};
