const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Please tell us your username!'] },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  discordName: {
    type: String,
    required: [true, 'Please tell us your discord name!'],
  },
  //   role: { type: String, enum: ['user', 'admin'], default: 'user' },
  //   profilePhoto: { type: String, default: 'default.jpg' },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  //   passwordChangedAt: { type: Date },
  //   passwordResetToken: { type: String },
  //   passwordResetExpiresAt: { type: Date },
  //   isDeleted: { type: Boolean, default: false, select: false },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 14);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined; // this field does not store values in the database
  next();
});

// Instance method - will be available for all the documents
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
