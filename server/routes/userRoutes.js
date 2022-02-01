const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// const multer = require('multer');
// const factory = require('./handlerFactory');
// const userProjectRouter = require('./userProjectRoutes');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// The routes after this middleware are protected!
router.use(authController.protect);

// Displays all the users of that project.
router.use('/:userId/view-projects', userController.getMyTours);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

// The routes after this middleware are not only protected but also require an admin user.
router.use(authController.restrictTo('admin'));

// Keep these routes for some uses of the System Administrator.
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
