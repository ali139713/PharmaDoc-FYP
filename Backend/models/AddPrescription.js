const mongoose = require("mongoose");

const AddPrescription = mongoose.Schema({
  doctorID: { type: String },
  userID: { type: String },
  prescription: { type: Array },
  doctorName: { type: String },
});

module.exports = mongoose.model("AddPrescription", AddPrescription);
