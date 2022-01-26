const express = require('express');
const statusController = require('../controllers/statusController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// router.route('/:id/projects').get(statusController.getAllProjects);

// router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(statusController.getAllStatuses)
  .post(statusController.createStatus);

router
  .route('/:id')
  .get(statusController.getStatus)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    statusController.updateStatus
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    statusController.deleteStatus
  );

module.exports = router;
