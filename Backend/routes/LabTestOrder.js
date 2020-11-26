const express = require("express");
const labtestOrderRouter = express.Router();
const LabTestOrder = require("../models/LabTestOrder");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

/// Get LabTest Order ///

labtestOrderRouter.get("/get", (req, res, next) => {
  LabTestOrder.find()
    .select("name price lab _id description userEmail")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        labtestorders: docs.map((doc) => {
          console.log(doc);
          return {
            name: doc.name,
            price: doc.price,
            userEmail: doc.userEmail,
            lab: doc.lab,
            description: doc.description,
            _id: doc._id,
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

/// Post LabTest Order///

labtestOrderRouter.post("/post", (req, res, next) => {
  const labtestorder = new LabTestOrder({
    _id: new mongoose.Types.ObjectId(),
    userID: req.body.userID,
    userEmail: req.body.userEmail,
    name: req.body.name,
    price: req.body.price,
    lab: req.body.lab,
    description: req.body.description,
  });

  labtestorder
    .save()
    .then((result) => {
      var transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "axianshaikhy@gmail.com",
          pass: "SP17-BSE-018",
        },
      });
      var mailOptions = {
        from: "info@PharmaDoc.com",
        to: labtestorder.userEmail,

        subject: "Labtest appointment confirmation",
        html: `
            <p>Your Labtest of ${labtestorder.name} having total amount ${labtestorder.price} from ${labtestorder.lab} is confirmed.
            You will receive a call from lab representative for further confirmation...</p>
                      `,
      };
      transpoter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(error);
        }
      });

      console.log(labtestorder);
      res.status(201).json({
        message: "Created  labtestOrder successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = labtestOrderRouter;
