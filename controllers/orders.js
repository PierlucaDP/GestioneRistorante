const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

const {
  findTopCustomer,
  calculateTotalRevenue,
  findTopEarningWaiter,
} = require('../utils/functions');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all orders
// @route   GET /api/orders/
// @access  Public
exports.getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

// @desc    Get a single order by id
// @route   GET /api/orders/:id
// @access  Public
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id inserted.`, 400));
  }

  res.status(200).json({ success: true, data: order });
});

// @desc    Create a order
// @route   POST /api/orders/
// @access  Public
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { customer, user, paid, products } = req.body;

  const userObject = await User.findById(user);

  const productsForOrder = await Promise.all(
    products.map(async (product) => {
      const { product: productId, quantity, price } = product;

      const productObj = await Product.findById(productId);

      if (quantity < 0) {
        return next(
          new ErrorResponse('The quantity must be greater than 0.', 401)
        );
      }
      
      return { product: productObj, quantity, price };
    })
  );

  const order = await Order.create({
    customer,
    user: userObject,
    paid,
    products: productsForOrder,
  });

  res.status(201).json({
    success: true,
    data: order,
  });
});

// @desc    Update a order by id
// @route   PUT /api/orders/:id
// @access  Public
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id inserted.`, 400));
  }

  res.status(200).json({ success: true, data: order });
});

// @desc    Delete a order by id
// @route   DELETE /api/orders/:id
// @access  Public
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id inserted.`, 400));
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc    Get the top customer
// @route   GET /api/orders/top-customer
// @access  Public
exports.topCustomer = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const topCustomer = await findTopCustomer(startDate, endDate);
  if (topCustomer) {
    res.status(200).json({ success: true, data: topCustomer });
  } else {
    res.status(404).json({
      success: false,
      message: 'No customers found in the specified date range.',
    });
  }
});

// @desc    Get the total revenue
// @route   GET /api/orders/total-revenue
// @access  Public
exports.totalRevenue = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const totalRevenue = await calculateTotalRevenue(startDate, endDate);
  if (totalRevenue) {
    res.status(200).json({ success: true, totalRevenue: totalRevenue });
  } else {
    res.status(404).json({
      success: false,
      message: 'No revenues founds in the specified date range.',
    });
  }
});

// @desc    Get the top waiter
// @route   GET /api/orders/top-waiter
// @access  Public
exports.topWaiter = asyncHandler(async (req, res, next) => {
  const topWaiter = await findTopEarningWaiter();
  if (topWaiter) {
    res.status(200).json({ success: true, topWaiter: topWaiter });
  } else {
    res.status(404).json({
      success: false,
      message: 'No waiter found.',
    });
  }
});
