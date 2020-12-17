const mongoose = require("mongoose");

const AddPrescription = mongoose.Schema({
  doctorID: { type: String },
  userID: { type: String },
  prescription: { type: Array },
});

module.exports = mongoose.model("AddPrescription", AddPrescription);
