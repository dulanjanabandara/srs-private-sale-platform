const Project = require('../models/projectModel');

// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project, { path: 'users' });
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
