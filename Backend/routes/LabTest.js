const express = require("express");
const labtestRouter = express.Router();
const LabTest = require("../models/LabTest");
const mongoose = require("mongoose");

/// GET  LabTest///

labtestRouter.get("/get", (req, res, next) => {
  LabTest.find()
    .select("name _id price lab description ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        labtests: docs.map((doc) => {
          console.log(doc);
          return {
            name: doc.name,
            price: doc.price,
            lab: doc.lab,
            description: doc.description,
            _id: doc._id,
          };
        }),
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      console.log(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/// Post LabTest ///
labtestRouter.post("/post", (req, res, next) => {
  const labtest = new LabTest({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    lab: req.body.lab,
    description: req.body.description,
  });

  labtest
    .save()
    .then((result) => {
      console.log(labtest);
      res.status(201).json({
        message: "Created  labtest successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/// Update without image (Labtest)///

labtestRouter.patch("/update/:id", async (req, res, next) => {
  const id = req.params.id;
  await LabTest.findByIdAndUpdate({ _id: id }, req.body).then(function (data) {
    if (!LabTest) {
      console.log("Invalid Id");
    } else {
      LabTest.findOne({ _id: id }).then(function (data) {
        res.send(data);
      });
    }
  });
});

/// Delete LabTest ///
labtestRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await LabTest.findByIdAndRemove(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = labtestRouter;
