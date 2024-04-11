const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  topCustomer,
  totalRevenue
} = require('../controllers/orders');

const express = require('express');

const router = express.Router();
router.route('/top-customer').get(topCustomer);
router.route('/total-revenue').get(totalRevenue);

router.route('/').get(getOrders).post(createOrder);
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
