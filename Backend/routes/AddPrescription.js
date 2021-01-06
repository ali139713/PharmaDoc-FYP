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
    .select("prescription ,doctorID , doctorName _id")
    .exec()
    .then(async (prescriptions) => {
      let response = [];
      for await (let item of prescriptions) {
        const prescription = item.prescription;
        doctorName = item.doctorName;
        prescriptionID = item._id;
        const obj = {
          prescription,
          doctorName,
          prescriptionID,
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

// Delete Prescription
PrescriptionRouter.delete("/deletePrescription", async (req, res) => {
  let filterArray = [];
  const prescriptionID = req.query.prescriptionID;
  const medID = req.query.medID;
  console.log("PrescriptionID  :", prescriptionID);
  console.log("medID  :", medID);
  const pres = await AddPrescription.find({
    _id: prescriptionID,
  }).then(async (res) => {
    // console.log("res", res[0].prescription);
    filterArray = res[0].prescription.filter((p) => p.medID != medID);

    res[0].prescription = filterArray;

    if (res[0].prescription.length < 1) {
      await AddPrescription.findByIdAndRemove({ _id: prescriptionID });
    } else {
      await AddPrescription.findOneAndUpdate(
        { _id: prescriptionID },
        res[0]
      ).then(async (res) => console.log("res: ", res));
    }
    console.log("Filterr Array", filterArray);
  });
});
