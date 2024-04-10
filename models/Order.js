const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: [true, "Please insert the total price"],
  },
  paid: {
    type: Boolean,
    default: false,
  },
  amountOrdered: {
    type: Number,
    required: [true, "Please insert the total amount of product ordered"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
