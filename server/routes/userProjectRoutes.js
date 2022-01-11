const express = require('express');
const userProjectController = require('../controllers/userProjectController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(userProjectController.getAllUserProjects)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    userProjectController.createUserProject
  );

module.exports = router;
