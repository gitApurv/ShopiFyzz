const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    items: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
