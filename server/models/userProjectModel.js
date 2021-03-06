const mongoose = require('mongoose');
// const projectModel = require('./projectModel');

const userProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User participated project must have a user!'],
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project',
      required: [true, 'User participated project must have a project!'],
    },
    dateParticipated: {
      type: Date,
      default: Date.now(),
    },
    amount: {
      type: Number,
    },
    contributionAmount: {
      type: Number,
      set: (val) => Math.round(val * 100) / 100, // 4.66666, 466.666, 467, 4.67
    },
    contributingWallet: {
      type: String,
    },
    transactionLink: {
      type: String,
      required: [
        true,
        'There must be a transaction link in order to register to a project!',
      ],
    },
    noOfEligibleTokens: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['in-progress', 'accepted', 'rejected'],
      default: 'in-progress',
    },
    active: { type: Boolean, default: true, select: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// userProjectSchema.index({ user: 1, project: 1 }, { unique: true });

userProjectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username email discordName profilePhoto',
  }).populate({
    path: 'project',
    select:
      'name websiteLink twitterLink pitchDeckLink documentsLink allocation fee status vestingSchedule',
  });
  next();
});

userProjectSchema.methods.calculateContributionAmount = function () {
  this.contributionAmount =
    this.amount - (this.amount * this.project.fee) / 100;
};

const UserProject = mongoose.model('UserProject', userProjectSchema);
module.exports = UserProject;
