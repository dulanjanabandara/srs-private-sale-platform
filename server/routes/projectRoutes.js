const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
const userProjectRouter = require('./userProjectRoutes');

const router = express.Router();

// Middleware to check whether the id parameter is valid
// router.param('id', projectController.checkID);
// Middleware to check the request body

// POST /tours/3456shlsgp/reviews
// GET /tours/3456shlsgp/reviews

router.use('/:projectId/join-project', userProjectRouter); // User join for a project after logged in
router.use('/:projectId/view-users', userProjectRouter); // Displays all the users of that project

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.createProject
  );

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.updateProject
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.deleteProject
  );

module.exports = router;
