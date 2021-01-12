const mongoose = require("mongoose");

const AppointmentWithDoctor = mongoose.Schema({
  doctorID: { type: String, required: true },
  userID: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  cellNumber: { type: String, required: true },
  rating: { type: Number },
});

module.exports = mongoose.model("AppointmentWithDoctor", AppointmentWithDoctor);
