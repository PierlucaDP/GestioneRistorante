const router = require('express').Router();
const { register, login, getLoggedUser } = require('../controllers/auth');
const {protect} = require('../middleware/auth');

router.route('/register').post(register);

router.route('/login').get(login);

router.route('/me').get(protect, getLoggedUser);

module.exports = router;
