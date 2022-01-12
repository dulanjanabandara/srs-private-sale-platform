const UserProject = require('../models/userProjectModel');
const factory = require('./handlerFactory');
// const catchAsync = require('../utils/catchAsync');
// const APIFeatures = require('../utils/apiFeatures');
// const AppError = require('../utils/appError');

exports.setUserProjectIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.project) req.body.project = req.params.projectId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllUserProjects = factory.getAll(UserProject);
exports.getUserProject = factory.getOne(UserProject);
exports.createUserProject = factory.createOne(UserProject);
exports.updateUserProject = factory.updateOne(UserProject);
exports.deleteUserProject = factory.deleteOne(UserProject);
