const mongoose = require("mongoose");

const AddDiagnosis = mongoose.Schema({
  doctorID: { type: String },
  userID: { type: String },
  diagnosis: { type: Array },
  doctorName: { type: String },
});

module.exports = mongoose.model("AddDiagnosis", AddDiagnosis);
