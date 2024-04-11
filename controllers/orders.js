const Order = require('../models/Order');
const Customer = require('../models/Customer');
const User = require('../models/User');

const {
  findTopCustomer,
  calculateTotalRevenue,
} = require('../utils/functions');

// @desc    Get all orders
// @route   GET /api/orders/
// @access  Public
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res
      .status(200)
      .json({ success: true, totalOrders: orders.length, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get a single order by id
// @route   GET /api/orders/:id
// @access  Public
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res
        .status(400)
        .json({ success: false, message: 'Order not found with id inserted.' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create a order
// @route   POST /api/orders/
// @access  Public
exports.createOrder = async (req, res, next) => {
  try {
    const { customer, user, totalPrice, paid, amountOrdered } = req.body;

    const customerObject = await Customer.findById(customer);
    const userObject = await User.findById(user);

    const order = await Order.create({
      customer: customerObject,
      user: userObject,
      totalPrice,
      paid,
      amountOrdered,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a order by id
// @route   PUT /api/orders/:id
// @access  Public
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);

    if (!order) {
      res
        .status(400)
        .json({ success: false, message: 'Order not found with id inserted.' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a order by id
// @route   DELETE /api/orders/:id
// @access  Public
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res
        .status(400)
        .json({ success: false, message: 'Order not found with id inserted.' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.topCustomer = async (req, res, next) => {
  const { startDate, endDate } = req.query;

  try {
    const topCustomer = await findTopCustomer(startDate, endDate);
    if (topCustomer) {
      res.status(200).json({ success: true, data: topCustomer });
    } else {
      res.status(404).json({
        success: false,
        message: 'No customers found in the specified date range.',
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.totalRevenue = async (req, res, next) => {
  const { startDate, endDate } = req.query;

  try {
    const totalRevenue = await calculateTotalRevenue(startDate, endDate);
    if (totalRevenue) {
      res.status(200).json({ success: true, totalRevenue: totalRevenue });
    } else {
      res.status(404).json({
        success: false,
        message: 'No revenues founds in the specified date range.',
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};