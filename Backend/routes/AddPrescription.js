const express = require("express");
const PrescriptionRouter = express.Router();
const AddPrescription = require("../models/AddPrescription");
const User = require("../models/User");

// Post Prescription by Doctor for patient(User)
PrescriptionRouter.post("/registerPrescription/:id", async (req, res) => {
  const doctorID = req.body.newPrescription.doctorID;
  const userID = req.body.newPrescription.userID;
  let prescription = req.body.newPrescription.prescription;
  let doc = await User.find({ _id: doctorID });
  let name = doc[0].firstName + " " + doc[0].lastName;

  const newPrescription = new AddPrescription({
    doctorID: doctorID,
    userID: userID,
    prescription: prescription,
    doctorName: name,
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
  let doctorName = "";
  AddPrescription.find({ userID: userID })
    .select("prescription ,doctorID , doctorName")
    .exec()
    .then(async (prescriptions) => {
      let response = [];
      for await (let item of prescriptions) {
        const prescription = item.prescription;
        doctorName = item.doctorName;
        const obj = {
          prescription,
          doctorName,
        };
        response.push(obj);
      }
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err,
      });
    });
});
