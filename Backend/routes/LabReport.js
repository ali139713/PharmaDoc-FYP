const express = require("express");
const LabReport = require("../models/LabReport");
const LabReportRouter = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");

LabReportRouter.use(express.static(__dirname + "../../FYP/Client/public/"));

var Storage = multer.diskStorage({
  destination: "../../FYP/Client/public/Uploads/",

  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

LabReportRouter.post(
  "/postreport",
  upload.single("file"),
  async (req, res, next) => {
    console.log("fileeeeeeeeeeee : ", req.body);
    if (!req.file) {
      return res.status(400).json({
        message: { msgBody: "File Required", msgError: true },
      });
    }
    const imagepath = req.file.path.substr(23);
    const labReport = await new LabReport({
      _id: new mongoose.Types.ObjectId(),
      reportUrl: imagepath,
      userEmail: req.body.userEmail,
      price: req.body.price,
      lab: req.body.lab,
      description: req.body.description,
      userID: req.body.userID,
      testOrderID: req.body._id,
    });
    console.log(labReport);
    labReport

      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Created Lab Report successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
);

LabReportRouter.get("/getreport", (req, res, next) => {
  const userID = req.query.userID;

  console.log("User ID for Report : ", userID);
  LabReport.find({ userID: userID })
    .select("_id reportUrl userEmail price lab description userID")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        labs: docs.map((doc) => {
          console.log(doc);
          return {
            reportID: doc._id,
            reportUrl: doc.reportUrl,
            userEmail: doc.userEmail,
            price: doc.price,
            lab: doc.lab,
            description: doc.description,
            userID: doc.userID,
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

LabReportRouter.get("/downloadfile", (req, res) => {
  let path = req.query.path;
  path = path.replace(/\\/g, "/");

  console.log("Pathhhh : ", path);
  res.download("../../FYP/Client/public" + path);
});

module.exports = LabReportRouter;
