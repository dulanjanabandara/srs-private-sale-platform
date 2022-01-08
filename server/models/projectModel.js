const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {},
  description: {},
  websiteLink: {},
  twitterLink: {},
  pitchDeckLink: {},
  documentsLink: {},
  blockchain: {},
  allocation: {},
  fee: {},
  multiTokenDeal: {},
  token1Price: {},
  token2Price: {},
  pricePerToken: {},
  status: {},
  vestingShedule: {},
  coverImage: {},
  createdAt: {},
  startDate: {},
  isDeleted: {},
  deletedAt: {},
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
