const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: Object,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [],
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
