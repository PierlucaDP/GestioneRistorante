const mongoose = require('mongoose');
const Product = require('./Product');
const Order = require('./Order');


const ProductOrderSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Please add an amount buyed"],
        min: [0, "The minimum quantity that can be stored is 0"]
    },
    price: {
        type: Number,
        required: [true, "Please add a price"]
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
});


module.exports = mongoose.model('ProductOrder',ProductOrderSchema);