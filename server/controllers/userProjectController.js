const UserProject = require('../models/userProjectModel');
// const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getAllUserProjects = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.projectId) filter = { project: req.params.projectId };

  const userProjects = await UserProject.find(filter);

  res.status(200).json({
    status: 'success',
    results: userProjects.length,
    data: {
      userProjects,
    },
  });
});

exports.createUserProject = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.project) req.body.project = req.params.projectId;
  if (!req.body.user) req.body.user = req.user.id;

  const newUserProject = await UserProject.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      userProject: newUserProject,
    },
  });
});
