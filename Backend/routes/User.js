const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const passportConfig = require("../passport");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
userRouter.use(express.static(__dirname + "../../FYP/Client/public/"));

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

// Sign Token
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Asad",
      sub: userID,
    },
    "Asad",
    { expiresIn: "1h" }
  );
};
// for Signup
userRouter.post("/register", (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const status = "Not Approved";
  User.findOne({ email }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    }
    if (user) {
      res.status(400).json({
        message: { msgBody: "Email Already Regstered", msgError: true },
      });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role,
        status,
      });
      newUser.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: { msgBody: "Error has occured Second", msgError: true },
          });
        } else {
          res.status(201).json({
            message: { msgBody: "Successfully Registered", msgError: false },
          });
        }
      });
    }
  });
});

// Login

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, email, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { email, role },
        message: { msgBody: "valid Email and Password", msgError: false },
      });
    } else {
      res.status(400).json({
        message: { msgBody: "Email Already Regstered", msgError: true },
      });
    }
  }
);

// Logout

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { email: "", role: "" }, success: true });
  }
);
// Forgot Password

userRouter.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        console.log("Email not registered");
        res.status(422).json({
          message: { msgBody: "Email not Registered", msgError: true },
        });
      }
      var transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "axianshaikhy@gmail.com",
          pass: "SP17-BSE-018",
        },
      });
      var mailOptions = {
        from: "info@PharmaDoc.com",
        to: user.email,

        subject: "Password Recovery",
        html: `
        <p>You requested for password reset</p>
        <h5>click in this <a href="http://localhost:3000/reset/${token}">Password Reset Link</a> to reset password</h5>
        `,
      };

      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transpoter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              message: { msgBody: "Check Your Email", msgError: false },
            });
          }
        });
      });
    });
  });
});
// Set New Password by their Profile
userRouter.post("/change-password", (req, res) => {
  const userID = req.body.userInfo._id;
  const newPassword = req.body.userInfo.password;
  User.findOne({ _id: userID }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    }
    if (!user) {
      res.status(400).json({
        message: { msgBody: "User Cannot exist", msgError: true },
      });
    } else {
      user.password = newPassword;
      user.save().then((saveduser) => {
        res.json({
          msgBody: "Password Update Successfully",
          msgError: false,
        });
      });
    }
  });
});

// Update profile picture by their profile
userRouter.post(
  "/uploadProfileImage",
  upload.single("profileImage"),
  (req, res, next) => {
    console.log(req.file);
    const imagepath = req.file.path.substr(23);
    // const imagepath = req.file.path;

    res.status(201).send(req.file.path.substr(23));
  }
);
// Set New Password (Forgot Password)
userRouter.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({
          message: { msgBody: "Try Again Session Expired", msgError: true },
        });
      }
      user.password = newPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      user.save().then((saveduser) => {
        res.json({
          msgBody: "Password Update Successfully",
          msgError: false,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// Authentication

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, firstName, lastName, email, role } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { _id, firstName, lastName, email, role },
    });
  }
);
// Get Doctors info
userRouter.get("/getDoctors", (req, res, next) => {
  User.find({ role: "Doctor" })
    .select(
      " _id firstName lastName email specialization certificates cellNumber fee address status profilePicture"
    )
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        doctors: docs.map((doc) => {
          // console.log(doc);
          return {
            _id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            specialization: doc.specialization,
            certificates: doc.certificates,
            cellNumber: doc.cellNumber,
            fee: doc.fee,
            address: doc.address,
            status: doc.status,
            profilePicture: doc.profilePicture,
          };
        }),
      };
      res.status(200).json(response);
      // console.log(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Get User By ID
userRouter.get("/getUser", (req, res, next) => {
  const userID = req.query;
  User.find({ _id: userID })
    .select(
      " _id firstName lastName email address cellNumber dateOfBirth startTime endTime apointmentInterval city specialization fee pmdc certificates services profilePicture"
    )
    .exec()
    .then((users) => {
      const response = {
        count: users.length,
        users: users.map((user) => {
          // console.log(user);
          return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            cellNumber: user.cellNumber,
            dateOfBirth: user.dateOfBirth,
            startTime: user.startTime,
            endTime: user.endTime,
            city: user.city,
            specialization: user.specialization,
            pmdc: user.pmdc,
            fee: user.fee,
            certificates: user.certificates,
            services: user.services,
            apointmentInterval: user.apointmentInterval,
            profilePicture: user.profilePicture,
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

// Update Doctor Profile
userRouter.patch("/update/doctorProfile/:id", async (req, res, next) => {
  const id = req.params.id;

  console.log("User Object  : ", req.body);
  await User.findByIdAndUpdate({ _id: id }, req.body).then(function (data) {
    if (!User) {
      console.log("Invalid Id");
    } else {
      User.findOne({ _id: id }).then(function (data) {
        res.send(data);
      });
    }
  });
});

/// Delete User By id ///
userRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndRemove(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
module.exports = userRouter;
