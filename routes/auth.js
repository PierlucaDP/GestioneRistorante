const router = require('express').Router();
const {
    register,
    login
} = require('../controllers/auth');


router.route('/register')
    .post(register);

router.route('/login')
    .get(login);

module.exports = router;
