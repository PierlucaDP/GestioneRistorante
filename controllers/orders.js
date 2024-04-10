const Order = require("../models/Order");

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

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res
        .status(400)
        .json({ success: false, message: "Order not found with id inserted." });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);

    if (!order) {
      res
        .status(400)
        .json({ success: false, message: "Order not found with id inserted." });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res
        .status(400)
        .json({ success: false, message: "Order not found with id inserted." });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
