const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

router.use(protect);

router.route('/')
  .get(authorize('Admin'), getUsers)
  .post(authorize('Admin'), createUser);

router
  .route('/:id')
  .get(authorize('Admin'), getUserById)
  .put(authorize('Admin'), updateUser)
  .delete(authorize('Admin'), deleteUser);

module.exports = router;
