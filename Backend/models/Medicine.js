const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, required: true },
  quantity: { type: Number, required: true },
  prescription: { type: String, required: true },
  pharmacyName: { type: String, required: true },
  productImage: { type: String, required: true },
});

module.exports = mongoose.model("Medicine", medicineSchema);
