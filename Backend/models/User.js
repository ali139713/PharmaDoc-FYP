const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 20,
    trim: true,
  },
  lastName: {
    type: String,
    max: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Patient", "Doctor", "Lab Manager"],
    required: true,
  },
  resetToken: String,
  expireToken: Date,
  address: {
    type: String,
  },
  cellNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },

  apointmentInterval: {
    type: String,
  },

  Review: {
    type: String,
  },
  city: {
    type: String,
  },
  specialization: {
    type: String,
  },
  fee: {
    type: String,
  },
  services: {
    type: String,
  },
  certificates: {
    type: String,
  },
  pmdc: {
    type: Number,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
