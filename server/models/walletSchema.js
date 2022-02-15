const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A status must have a name'],
      trim: true,
      unique: true,
    },
    address: { type: String },
    active: { type: Boolean, default: true, select: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// walletSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'projects',
//     select: 'name',
//   });
// });

walletSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

walletSchema.index({ allocation: -1, fee: -1 }); // Sort accoring to the ascending order of the allocation

const Wallet = mongoose.model('Status', walletSchema);

module.exports = Wallet;
