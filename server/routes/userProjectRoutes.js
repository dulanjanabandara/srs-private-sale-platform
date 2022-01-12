const express = require('express');
const userProjectController = require('../controllers/userProjectController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// POST /project/hfhlauoeag46/user
// GET /project/hfhlauoeag46/user
// POST /reviews

router
  .route('/')
  .get(userProjectController.getAllUserProjects)
  .post(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    userProjectController.createUserProject
  );

module.exports = router;
