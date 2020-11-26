const mongoose = require("mongoose");

const pharmacySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
});

module.exports = mongoose.model("Pharmacy", pharmacySchema);
