const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, surname, email, password, role } = req.body;

  const user = await User.create({
    name,
    surname,
    email,
    password,
    role,
  });


  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/register
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(
        new ErrorResponse('Please provide an email and a password', 401)
      );

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorResponse('Invalid credetials', 401));

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse('Invalid credetials', 401));

    sendTokenResponse(user, 200, res);

  } catch (err) {
    console.log(err);
  }
});

// @desc    Get logged user
// @route   GET /api/auth/me
// @access  Private
exports.getLoggedUser = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user.id);

  res.status(200).json({
    sucess: true,
    user
  });
});


const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getJWTSignedToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  res
    .status(statusCode)
    .json({
      success: true,
      token
    });

};

