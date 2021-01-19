const express = require("express");
const pharmacyRouter = express.Router();
const Pharmacy = require("../models/Pharmacy");
const mongoose = require("mongoose");

/// Get pharmacies ///

pharmacyRouter.get("/get", (req, res, next) => {
  Pharmacy.find()
    .select("name _id status")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        pharmacies: docs.map((doc) => {
          console.log(doc);
          return {
            name: doc.name,
            _id: doc._id,
            status: doc.status,
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

/// Post Pharmacy ///
pharmacyRouter.post("/post", (req, res, next) => {
  const pharmacy = new Pharmacy({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    status: req.body.status,
  });

  pharmacy
    .save()
    .then((result) => {
      console.log(pharmacy);
      res.status(201).json({
        message: "Created  pharmacy successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/// Update pharmacy ///

pharmacyRouter.patch("/update/:id", async (req, res, next) => {
  const id = req.params.id;
  await Pharmacy.findByIdAndUpdate({ _id: id }, req.body).then(function (data) {
    if (!Pharmacy) {
      console.log("Invalid Id");
    } else {
      Pharmacy.findOne({ _id: id }).then(function (data) {
        res.send(data);
      });
    }
  });
});

/// Delete Pharmacy ///
pharmacyRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Pharmacy.findByIdAndRemove(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = pharmacyRouter;
