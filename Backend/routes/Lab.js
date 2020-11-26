const express = require("express");
const labRouter = express.Router();
const Lab = require("../models/Lab");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

labRouter.use(express.static(__dirname + "../../FYP/Client/public/"));

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

///////// Get Lab ///////////
labRouter.get("/get", (req, res, next) => {
  Lab.find()
    .select("name _id labImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        labs: docs.map((doc) => {
          console.log(doc);
          return {
            name: doc.name,
            labImage: doc.labImage,
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

/////////// Post Lab /////////////

labRouter.post("/post", upload.single("labImage"), async (req, res, next) => {
  console.log(req.file);
  const imagepath = req.file.path.substr(23);
  const lab = await new Lab({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    labImage: imagepath,
  });
  console.log(lab);
  lab

    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created lab successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/// Update with image(Lab) ///
labRouter.patch("/update/:id", upload.single("labImage"), async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const image = req.file.path;
  await Lab.findOneAndUpdate(id, {
    $set: {
      name,
      image,
    },
    new: true,
  })
    .then((doc) => {
      console.log("success", "Edits submitted successfully");
    })
    .catch((err) => {
      console.log("error", "Unable to edit article");
      console.log(err);
    });
});

//// Delete Lab ////////

labRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  Lab.findByIdAndRemove(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = labRouter;
