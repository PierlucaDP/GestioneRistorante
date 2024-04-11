const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: [true, 'Please insert the total price'],
  },
  paid: {
    type: Boolean,
    default: false,
  },
  amountOrdered: {
    type: Number,
    required: [true, 'Please insert the total amount of product ordered'],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },
});

module.exports = mongoose.model('Order', orderSchema);
