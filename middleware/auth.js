const asyncHandler = require('../middleware/asyncHandler');
const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token
    }

    if (!token) {
        return next(new ErrorResponse('Not authorize to access to this route', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        console.log("Token error "+err);
    }
})

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse('Current user is not authorized to acces this route', 403))
        }
        next();
    }
}