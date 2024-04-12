const { protect, authorize } = require('../middleware/auth');

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  topCustomer,
  totalRevenue,
  topWaiter,
} = require('../controllers/orders');

const Order = require('../models/Order');

const express = require('express');

const router = express.Router();
router.use(protect);

router.route('/top-customer').get(authorize('Admin'), topCustomer);
router.route('/total-revenue').get(authorize('Admin'), totalRevenue);
router.route('/top-waiter').get(authorize('Admin'), topWaiter);

const filteredResult = require('../middleware/filteredResults');

router
  .route('/')
  .get(authorize('Admin', 'Waiter'), filteredResult(Order), getOrders)
  .post(authorize('Admin', 'Waiter'), createOrder);

router
  .route('/:id')
  .get(authorize('Admin', 'Waiter'), getOrder)
  .put(authorize('Admin', 'Waiter'), updateOrder)
  .delete(authorize('Admin', 'Waiter'), deleteOrder);

module.exports = router;
