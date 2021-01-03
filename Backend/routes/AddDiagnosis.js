const express = require("express");
const DiagnosisRouter = express.Router();
const AddDiagnosis = require("../models/AddDiagnosis");
const User = require("../models/User");

// Post Prescription by Doctor for patient(User)
DiagnosisRouter.post("/registerDiagnosis/:id", async (req, res) => {
  const doctorID = req.body.newDiagnosis.doctorID;
  const userID = req.body.newDiagnosis.userID;
  let diagnosis = req.body.newDiagnosis.diagnosis;
  let doc = await User.find({ _id: doctorID });
  let name = doc[0].firstName + " " + doc[0].lastName;

  const newDiagnosis = new AddDiagnosis({
    doctorID: doctorID,
    userID: userID,
    diagnosis: diagnosis,
    doctorName: name,
  });
  // console.log("new Prescription  doctorID: ", doctorID);
  // console.log("new Prescription  userID: ", userID);
  // console.log("new Prescription  prescription: ", prescription);
  console.log("new Diagnosis  : ", newDiagnosis);
  await newDiagnosis.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    } else {
      res.status(201).json({
        message: {
          msgBody: "Diagnosis Added Successfully",
          msgError: false,
        },
      });
    }
  });
});

// get Prescription by Doctor for patient(User)
// DiagnosisRouter.get("/getDiagnosis", async (req, res) => {
//   const userID = req.query.userID;
//   console.log("USER ID in Prescripton Get USER ", userID);
//   AddDiagnosis.find({ userID: userID })
//     .select("diagnosis")
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         diagnosis: docs.map((doc) => {
//           console.log(doc);
//           return {
//             diagnosis: doc.diagnosis,
//           };
//         }),
//       };

//       res.status(200).json(response);
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

DiagnosisRouter.get("/getDiagnosis", async (req, res) => {
  const userID = req.query.userID;
  let doctorName = "";
  AddDiagnosis.find({ userID: userID })
    .select("diagnosis ,doctorID , doctorName")
    .exec()
    .then(async (diagnosis) => {
      let response = [];
      for await (let item of diagnosis) {
        const diagnose = item.diagnosis;
        doctorName = item.doctorName;
        const obj = {
          diagnose,
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
module.exports = DiagnosisRouter;
