const mongoose = require("mongoose");

const labSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  labImage: { type: String, required: true },
});

module.exports = mongoose.model("Lab", labSchema);
