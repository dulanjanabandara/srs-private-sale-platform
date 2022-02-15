const mongoose = require('mongoose');

const blockchainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A status must have a name'],
      trim: true,
      unique: true,
    },
    active: { type: Boolean, default: true, select: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// blockchainSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'projects',
//     select: 'name',
//   });
// });

blockchainSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

blockchainSchema.index({ allocation: -1, fee: -1 }); // Sort accoring to the ascending order of the allocation

const Blockchain = mongoose.model('Status', blockchainSchema);

module.exports = Blockchain;
