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
  amountOrdered: Number,
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

orderSchema.pre('save', function (next) {
  this.amountOrdered = this.products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  next();
});

module.exports = mongoose.model('Order', orderSchema);
