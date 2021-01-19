const mongoose = require("mongoose");

const pharmacySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  status: { type: String },
});

module.exports = mongoose.model("Pharmacy", pharmacySchema);
