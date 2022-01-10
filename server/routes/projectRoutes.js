const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

const router = express.Router();

// Middleware to check whether the id parameter is valid
// router.param('id', projectController.checkID);
// Middleware to check the request body

router
  .route('/')
  .get(authController.protect, projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
