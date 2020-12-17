const express = require("express");
const PrescriptionRouter = express.Router();
const AddPrescription = require("../models/AddPrescription");

// Post Prescription by Doctor for patient(User)
PrescriptionRouter.post("/registerPrescription/:id", async (req, res) => {
  const doctorID = req.body.newPrescription.doctorID;
  const userID = req.body.newPrescription.userID;
  let prescription = req.body.newPrescription.prescription;

  const newPrescription = new AddPrescription({
    doctorID: doctorID,
    userID: userID,
    prescription: prescription,
  });
  // console.log("new Prescription  doctorID: ", doctorID);
  // console.log("new Prescription  userID: ", userID);
  // console.log("new Prescription  prescription: ", prescription);
  console.log("new Prescription  : ", newPrescription);
  await newPrescription.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    } else {
      res.status(201).json({
        message: {
          msgBody: "Prescription Added Successfully",
          msgError: false,
        },
      });
    }
  });
});
module.exports = PrescriptionRouter;
