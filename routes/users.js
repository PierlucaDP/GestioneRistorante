const router = require('express').Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');

router.route("/")
    .get(getProducts)
    .post(createProduct);
router.route("/:id")
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;