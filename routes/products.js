const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const filteredResults = require('../middleware/filteredResults');
const Product = require('../models/Product');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

router.use(protect);

router
  .route('/')
  .get(
    authorize('Admin', 'Waiter', 'WarehouseWorker'),
    filteredResults(Product),
    getProducts
  )
  .post(authorize('Admin', 'WarehouseWorker'), createProduct);
router
  .route('/:id')
  .get(authorize('Admin', 'Waiter', 'WarehouseWorker'), getProductById)
  .put(authorize('Admin', 'WarehouseWorker'), updateProduct)
  .delete(authorize('Admin', 'WarehouseWorker'), deleteProduct);

module.exports = router;
