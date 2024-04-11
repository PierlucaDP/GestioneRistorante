const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

router.route('/')
  .get(protect, authorize('Admin', 'Waiter', 'WarehouseWorker'), getProducts)
  .post(protect, authorize('Admin', 'WarehouseWorker'), createProduct);
router
  .route('/:id')
  .get(protect, authorize('Admin', 'Waiter', 'WarehouseWorker'), getProductById)
  .put(protect, authorize('Admin', 'WarehouseWorker'), updateProduct)
  .delete(protect, authorize('Admin', 'WarehouseWorker'), deleteProduct);

module.exports = router;