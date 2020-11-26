const express = require("express");
const medicineRouter = express.Router();
const Medicine = require("../models/Medicine");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

medicineRouter.use(express.static(__dirname + "../../FYP/Client/public/"));

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
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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

// Post Medicine
medicineRouter.post(
  "/post",
  upload.single("productImage"),
  async (req, res, next) => {
    console.log(req.file);
    const imagepath = req.file.path.substr(23);
    // const imagepath = req.file.path;
    const medicine = await new Medicine({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      availability: req.body.availability,
      quantity: req.body.quantity,
      prescription: req.body.prescription,
      pharmacyName: req.body.pharmacyName,
      productImage: imagepath,
    });
    console.log(medicine);
    medicine
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Created medicine successfully",
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

// Post Medicine
medicineRouter.post(
  "/prescriptionimage",
  upload.single("prescriptionimage"),
  (req, res, next) => {
    console.log(req.file);
    const imagepath = req.file.path.substr(29);
    // const imagepath = req.file.path;

    res.status(201).send(req.file.path.substr(29));
  }
);

// Get Medicine

medicineRouter.get("/get", (req, res, next) => {
  Medicine.find()
    .select(
      "name price quantity _id productImage availability  prescription pharmacyName"
    )
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        medicines: docs.map((doc) => {
          console.log(doc);
          return {
            name: doc.name,
            price: doc.price,
            availability: doc.availability,
            quantity: doc.quantity,
            prescription: doc.prescription,
            pharmacyName: doc.pharmacyName,
            productImage: doc.productImage,
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

/// Update with image(Medicine) ///
medicineRouter.patch(
  "/update/:id",
  upload.single("productImage"),
  (req, res) => {
    const id = req.params.id;

    const name = req.body.name;
    const price = req.body.price;
    const availability = req.body.availability;
    const quantity = req.body.quantity;
    const prescription = req.body.prescription;
    const pharmacyName = req.body.pharmacyName;
    const productImage = req.file.path;

    Medicine.findByIdAndUpdate(id, {
      $set: {
        name,
        price,
        availability,
        quantity,
        prescription,
        pharmacyName,
        productImage,
      },
      new: true,
    })
      .then((doc) => {
        console.log("success", "Edited Successfully");
      })
      .catch((err) => {
        console.log("error", "Unable to edit article");
        console.log(err);
      });
  }
);

// /// Update Medicine in Order ///

medicineRouter.patch("/update/order/:id", async (req, res, next) => {
  const id = req.params.id;
  await Medicine.findByIdAndUpdate({ _id: id }, req.body).then(function (data) {
    if (!Medicine) {
      console.log("Invalid Id");
    } else {
      Medicine.findOne({ _id: id }).then(function (data) {
        res.send(data);
      });
    }
  });
});
/// Delete Medicine ///
medicineRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Medicine.findByIdAndRemove(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = medicineRouter;
