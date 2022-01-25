const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validator');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A project must have a name'],
      trim: true,
      unique: true,
    },
    description: { type: String, trim: true },
    websiteLink: { type: String },
    twitterLink: { type: String },
    pitchDeck: { type: String },
    documents: [String],
    // blockchain: {
    //   type: String,
    //   required: [true, 'A project must have a blockchain'],
    //   enum: {
    //     values: ['SOL', 'ETH', 'BSC', 'Other'],
    //     message: 'Select a valid blockchain',
    //   },
    // },
    allocation: {
      type: Number,
      required: [true, 'A project must have an allocation'],
      // set: (val) => Math.round(val * 10) / 10, // 4.66666, 46.6666, 47, 4.7
    },
    fee: {
      type: Number,
      required: [true, 'A project must have a fee'],
      validate: {
        validator: function (value) {
          return value < this.allocation; // this only points to current document when we are creating a NEW document! So this function is not going to work on update
        },
        message: 'Fee rate ({VALUE}) must be lower than the Allocation price',
      },
    },
    allocationPerNft: { type: Number },
    minContributionPerNft: { type: Number },
    maxContributionPerNft: { type: Number },
    maxContributionPerWallet: { type: Number },
    multiTokenDeal: {
      type: Boolean,
      required: [
        true,
        'Please select whether the projects is multi token deal or not',
      ],
    },
    token1Price: { type: Number, default: null },
    token2Price: { type: Number, default: null },
    pricePerToken: { type: Number, default: null },
    noOfTotalToken: { type: Number },
    noOfDistributedTokens: { type: Number },
    status: {
      type: mongoose.Schema.ObjectId,
      ref: 'Status',
      required: [true, 'A project must have a status'],
    },
    vestingSchedule: { type: String, trim: true },
    coverPhoto: {
      type: String,
      default: 'projectDefault.jpg',
      // required: [true, 'A project must have a cover image']
    },
    createdAt: { type: Date, default: Date.now(), select: false },
    startDate: { type: Date },
    active: { type: Boolean, default: true, select: false },

    // slug: String,
    // secretProject: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.index({ allocation: -1, fee: -1 }); // Sort accoring to the ascending order of the allocation

// projectSchema.pre(/^find/, function () {
//   this.populate({
//     path: 'status',
//     select: 'name',
//   });
// });

// Virtual properties - But not relevant for project model, We cannot use virtual properties in a query
// projectSchema.virtual('contributionAllocation').get(function () {
//   return (this.allocation * this.fee) / 100;
// });

// Virtual Populate
// projectSchema.virtual('users', {
//   ref: 'UserProject',
//   foreignField: 'project',
//   localField: '_id',
// });

// DOCUMENT MIDDLEWARE: runs before .save() and .create(). Not runs for .update()
// projectSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, {
//     lower: true,
//   });
//   next();
// });

// QUERY MIDDLEWARE
// projectSchema.pre(/^find/, function (next) {
//   this.find({ secretProject: { $ne: true }, isDeleted: false });
//   next();
// });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
