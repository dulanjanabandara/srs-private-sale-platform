const express = require('express');
const statusController = require('../controllers/statusController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(statusController.getAllStatuses)
  .post(statusController.createStatus);

router
  .route('/:id')
  .get(statusController.getStatus)
  .patch(statusController.updateStatus)
  .delete(statusController.deleteStatus);

module.exports = router;
