const mongoose = require("mongoose");

const labTestSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  lab: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("LabTest", labTestSchema);
