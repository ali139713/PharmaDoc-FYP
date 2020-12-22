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

// get Prescription by Doctor for patient(User)
PrescriptionRouter.get("/getPrescription", async (req, res) => {
  const userID = req.query.userID;
  console.log("USER ID in Prescripton Get USER ", userID);
  AddPrescription.find({ userID: userID })
    .select("prescription")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        prescription: docs.map((doc) => {
          console.log(doc);
          return {
            prescription: doc.prescription,
          };
        }),
      };

      res.status(200).json(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
