const router = require('express').Router();
const { register, login, getLoggedUser, logout } = require('../controllers/auth');

const { protect } = require('../middleware/auth');


router.route('/register').post(register);

router.route('/login').post(login);

router.route('/me').get(protect, getLoggedUser);

router.route('/logout').get(protect, logout);

module.exports = router;
