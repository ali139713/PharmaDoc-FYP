const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customerID: { type: String },
  customerName: { type: String, required: true },
  customerEmail: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: Number, required: true },
  orderItems: { type: Array, default: [], required: true },
  totalAmount: { type: String, required: true },
  publishDate: { type: String, minLength: 1, required: true },
  orderStatus: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  prescriptionImage: { type: String },
  pharmacyName: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
