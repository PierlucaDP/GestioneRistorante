const mongoose = require('mongoose');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
// @desc    Get all products
// @route   GET /api/products/
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, data: res.filteredResults });
});

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res
      .status(400)
      .json({ success: false, message: `Product not found with id inserted.` });
  }
  res.status(200).json({ success: true, data: product });
});

// @desc    Create a new product
// @route   POST /api/products/
// @access  Public
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    res
      .status(400)
      .json({
        success: false,
        message: `Product not found with id ${req.params.id}.`,
      });
  }
  res.status(200).json({ success: true, data: product });
});

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Public
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res
      .status(400)
      .json({ success: false, message: `Product not found with id inserted.` });
  }
});
