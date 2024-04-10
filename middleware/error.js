const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;


    if (err.name === 'CastError') {
        message = `Resource not founde with id od ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    if (error.code === 11000) {
        message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400);
    }

    if (err.code === 'ValidationError') {
        message = Object.values(error.errors).map(value => value.message);
        error = new ErrorResponse(message, 400);
    }


    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error'
    });
}

module.exports = errorHandler;
