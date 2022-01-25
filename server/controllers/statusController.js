const Status = require('../models/statusModel');
const factory = require('./handlerFactory');

exports.getAllStatuses = factory.getAll(Status);
exports.getStatus = factory.getOne(Status, { path: 'projects' });
exports.createStatus = factory.createOne(Status);
exports.updateStatus = factory.updateOne(Status);
exports.deleteStatus = factory.deleteOne(Status);
