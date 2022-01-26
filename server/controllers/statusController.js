const Status = require('../models/statusModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

// exports.getAllProjects = catchAsync(async (req, res, next) => {
//   const foundStatus = await Status.findById(req.params.id).populate({
//     path: 'projects',
//   });

//   res.status(204).json({
//     status: 'success',
//     data: foundStatus,
//   });
// });

exports.getAllStatuses = factory.getAll(Status);
exports.getStatus = factory.getOne(Status, { path: 'projects' });
exports.createStatus = factory.createOne(Status);
exports.updateStatus = factory.updateOne(Status);
exports.deleteStatus = factory.deleteOne(Status);
