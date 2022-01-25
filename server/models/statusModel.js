const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A status must have a name'],
      trim: true,
      unique: true,
    },
    active: { type: Boolean, default: true, select: false },
    projects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// statusSchema.pre(/^find/, function () {
//   this.populate({
//     path: 'projects',
//     select: 'name',
//   });
// });

statusSchema.index({ allocation: -1, fee: -1 }); // Sort accoring to the ascending order of the allocation

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
