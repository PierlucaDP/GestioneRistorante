const mongoose = require('mongoose');
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/v1/products/
// @access  Public
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, totalProducts: products.length, data: products });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get a single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).json({ success: false, message: `Product not found with id inserted.` });
        }
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Create a new product
// @route   POST /api/v1/products/
// @access  Public
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Public
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            res.status(400).json({ success: false, message: `Product not found with id ${req.params.id}.` });
        }
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete a product by ID
// @route   DELETE /api/v1/products/:id
// @access  Public
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(400).json({ success: false, message: `Product not found with id inserted.` });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
