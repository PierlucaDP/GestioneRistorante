const Order = require('../models/Order');

async function findTopCustomer(startDate, endDate) {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: '$customer',
          totalSpent: { $sum: '$totalPrice' },
        },
      },
      {
        $sort: { totalSpent: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    return result.length > 0 ? result[0]._id : null;
  } catch (err) {
    throw err;
  }
}

async function calculateTotalRevenue(startDate, endDate) {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    return result.length > 0 ? result[0].totalRevenue : 0;
  } catch (err) {
    throw err;
  }
}

module.exports = { findTopCustomer, calculateTotalRevenue };
