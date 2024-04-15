const mongoose = require('mongoose');
const Product = require('./Product');
const ErrorResponse = require('../utils/errorResponse');

const orderSchema = new mongoose.Schema({
  totalPrice: Number,
  paid: {
    type: Boolean,
    default: false,
  },
  amountOrdered: Number,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      price: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customer: {
    name: String,
    surname: String,
    phone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },
});

orderSchema.pre('save', function (next) {
  this.amountOrdered = this.products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  this.totalPrice = this.products.reduce((acc, list) => {
    return acc + (list.price || list.product.price) * list.quantity;
  }, 0);

  next();
});

orderSchema.pre('save', function (next) {
  this.products.map(async (list) => {
    const product = list.product;
    if (product.stored - list.quantity < 0) {
      return next(
        new ErrorResponse('Insufficient quantity stored in ware house.', 401)
      );
    }

    product.stored -= list.quantity;
    await Product.findByIdAndUpdate(product.id, {
      stored: product.stored,
    });
  });

  next();
});

module.exports = mongoose.model('Order', orderSchema);
