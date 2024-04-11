const { protect, authorize } = require('../middleware/auth');

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  topCustomer,
  totalRevenue,
} = require('../controllers/orders');

const Order = require('../models/Order');

const express = require('express');

const router = express.Router();

router.route('/top-customer').get(protect, authorize('Admin'), topCustomer);
router.route('/total-revenue').get(protect, authorize('Admin'), totalRevenue);

const filteredResult = require('../middleware/filteredResults');
router.route('/')
  .get(protect, authorize('Admin','Waiter'), filteredResult(Order), getOrders)
  .post(protect, authorize('Admin', 'Waiter'), createOrder);

router.route('/:id')
  .get(protect, authorize('Admin', 'Waiter'), getOrder)
  .put(protect, authorize('Admin', 'Waiter'), updateOrder)
  .delete(protect, authorize('Admin', 'Waiter'), deleteOrder);

module.exports = router;
