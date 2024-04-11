const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { name, surname, email, password, role } = req.body;

  const user = await User.create({
    name,
    surname,
    email,
    password,
    role,
  });

  const token = user.getJWTSignedToken();

  res.status(200).json({ success: true, token });
};

// @desc    Login user
// @route   GET /api/v1/auth/register
// @access  Public
exports.login = async (req, res, next) => {
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

    const token = user.getJWTSignedToken();

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.log(err);
  }
};
