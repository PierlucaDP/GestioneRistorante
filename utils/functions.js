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

async function findTopEarningWaiter() {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: '$user',
          totalEarnings: { $sum: '$totalPrice' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'waiter',
        },
      },
      {
        $unwind: '$waiter',
      },
      {
        $match: { 'waiter.role': 'Waiter' },
      },
      {
        $sort: { totalEarnings: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    if (result.length > 0) {
      return result[0].waiter;
    } else {
      return null; 
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findTopCustomer,
  calculateTotalRevenue,
  findTopEarningWaiter,
};
