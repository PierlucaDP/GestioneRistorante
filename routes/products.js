const router = require('express').Router();
const {protect} = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

router.route('/')
  .get(protect,getProducts)
  .post(protect, createProduct);
router
  .route('/:id')
  .get(protect, getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
