const UserProject = require('../models/userProjectModel');
// const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getAllUserProjects = catchAsync(async (req, res, next) => {
  const userProjects = await UserProject.find();

  res.status(200).json({
    status: 'success',
    results: userProjects.length,
    data: {
      userProjects,
    },
  });
});

exports.createUserProject = catchAsync(async (req, res, next) => {
  const newUserProject = await UserProject.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      userProject: newUserProject,
    },
  });
});
