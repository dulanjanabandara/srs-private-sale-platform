const express = require('express');
const userProjectController = require('../controllers/userProjectController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(userProjectController.getAllUserProjects)
  .post(
    authController.restrictTo('user', 'admin'),
    userProjectController.setUserProjectIds,
    userProjectController.createUserProject
  );

router
  .route('/:id')
  .get(userProjectController.getUserProject)
  .patch(
    authController.restrictTo('user', 'admin'),
    userProjectController.updateUserProject
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    userProjectController.deleteUserProject
  );

module.exports = router;
