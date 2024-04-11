const router = require('express').Router();
const {protect, authorize } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

router.use(protect);

router.route('/')
  .get(authorize('Admin', 'Waiter', 'WarehouseWorker'), getProducts)
  .post(authorize('Admin', 'WarehouseWorker'), createProduct);
router
  .route('/:id')
  .get(authorize('Admin', 'Waiter', 'WarehouseWorker'), getProductById)
  .put(authorize('Admin', 'WarehouseWorker'), updateProduct)
  .delete(authorize('Admin', 'WarehouseWorker'), deleteProduct);

module.exports = router;