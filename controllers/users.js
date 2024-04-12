const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler')

// @desc    Get all users
// @route   GET /api/users/
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.advancedResults });
});

// @desc    Get a single user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400).json({ success: false, message: `user not found with id inserted.` });
    }
});

// @desc    Create a new user
// @route   POST /api/users/
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user)
        res.status(400).json({ success: false, message: `user not found with id ${req.params.id}.` });

    res.status(200).json({ success: true, data: user });
});

// @desc    Delete a user by ID
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
        res.status(400).json({ success: false, message: `user not found with id inserted.` });
});
