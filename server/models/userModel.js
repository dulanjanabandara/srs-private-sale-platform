const mongoose = require('mongoose');
const validator = require('validator');
// const slugify = require('slugify');

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
  profilePhoto: { type: String, default: 'default.jpg' },
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

const User = mongoose.model('User', userSchema);
module.exports = User;
