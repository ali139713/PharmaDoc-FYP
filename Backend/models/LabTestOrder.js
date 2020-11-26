const mongoose = require("mongoose");

const labTestOrderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: { type: String, required: true },
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  lab: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("LabTestOrder", labTestOrderSchema);
