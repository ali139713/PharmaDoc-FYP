const mongoose = require("mongoose");

const LabReportSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  testName: { type: String },
  userEmail: { type: String },
  price: { type: Number },
  lab: { type: String },
  description: { type: String },
  reportUrl: { type: String },
  userID: { type: String },
  testOrderID: { type: String },
});

module.exports = mongoose.model("LabReport", LabReportSchema);
