const express = require("express");
const AppointmentRouter = express.Router();
const AppointmentWithDoctor = require("../models/AppointmentWithDoctor");
const User = require("../models/User");
const nodemailer = require("nodemailer");
// Post Appointment
AppointmentRouter.post("/registerAppointment/:id", async (req, res) => {
  const {
    doctorID,
    userID,
    userEmail,
    appointmentDate,
    appointmentTime,
    cellNumber,
  } = req.body.appointment;
  console.log("req.body.appointment", req.body.appointment);
  const newAppointment = new AppointmentWithDoctor({
    doctorID,
    userID,
    appointmentDate,
    appointmentTime,
    cellNumber,
  });
  var transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "axianshaikhy@gmail.com",
      pass: "SP17-BSE-018",
    },
  });
  var mailOptions = {
    from: "info@PharmaDoc.com",
    to: userEmail,

    subject: "Appointment with PharmaDoc Doctors",
    html: `
    <h1>Your Appointment Placed Successfully with the Doctor</h1>
    <h4>Your Your Appointment Date is ${appointmentDate} at ${appointmentTime} with Cell Number${cellNumber}</h4>
    
    `,
  };
  await newAppointment.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    } else {
      transpoter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.status(201).json({
            message: {
              msgBody: "Appointment Placed Successfully Check Your Email",
              msgError: false,
            },
          });
        }
      });
    }
  });
});

// Get Appointment by userID and DoctorID

AppointmentRouter.get("/getAppointments", async (req, res, next) => {
  const { userID } = req.query;
  const { doctorID } = req.query;

  let dId = "";
  let uId = "";

  let appointmentData = {};

  if (userID) {
    await AppointmentWithDoctor.find({ userID })
      .select(" _id doctorID userID appointmentDate appointmentTime  ")
      .exec()
      .then(async (appointments) => {
        let newAppointments = [];

        for await (appointment of appointments) {
          dId = appointment.doctorID;
          let doctorData = {};

          await User.findById({ _id: dId })
            .select("_id firstName lastName cellNumber address ")
            .exec()
            .then((res) => {
              doctorData = res;
            })
            .catch((error) => {
              console.log("error: ", error);
            });

          let obj = {
            _id: appointment._id,
            doctorID: appointment.doctorID,
            userID: appointment.userID,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            cellNumber: appointment.cellNumber,
            doctorName: doctorData.firstName + " " + doctorData.lastName,
            doctorCellNumber: doctorData.cellNumber,
            ClinicAddress: doctorData.address,
          };

          newAppointments.push(obj);
        }

        appointmentData = {
          count: newAppointments.length,
          appointments: newAppointments,
        };
        res.status(200).json(appointmentData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    await AppointmentWithDoctor.find({ doctorID })
      .select(" _id doctorID userID appointmentDate appointmentTime ")
      .exec()
      .then(async (appointments) => {
        let newAppointments = [];

        for await (appointment of appointments) {
          uId = appointment.userID;
          let userData = {};

          await User.findById({ _id: uId })
            .select("_id firstName lastName cellNumber")
            .exec()
            .then((res) => {
              userData = res;
            })
            .catch((error) => {
              console.log("error: ", error);
            });

          let obj = {
            _id: appointment._id,
            doctorID: appointment.doctorID,
            userID: appointment.userID,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            cellNumber: appointment.cellNumber,
            patientName: userData.firstName + " " + userData.lastName,
            patientCellNumber: userData.cellNumber,
          };

          newAppointments.push(obj);
        }

        appointmentData = {
          count: newAppointments.length,
          appointments: newAppointments,
        };
        res.status(200).json(appointmentData);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
});

// Get Appointment for Disable
AppointmentRouter.post("/disabledAppointments", (req, res, next) => {
  // const doctorID = req.body.doctorID;
  // const searchDate = req.body.appointmentDate;
  const doctorID = req.body.doctorID;
  const searchDate = req.body.appointmentDate;
  console.log("query", req.body.doctorID);
  console.log("Date", searchDate);

  AppointmentWithDoctor.find({
    doctorID: doctorID,
    appointmentDate: { $eq: new Date(searchDate) },
  })
    .select("appointmentTime appointmentDate")
    .exec()
    .then((r) => {
      console.log("res", r);
      res.status(200).send(r);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

// Cancel Appointment By User(Patient)
AppointmentRouter.delete("/cancelAppintment", async (req, res) => {
  const appointmentID = req.query._id;
  const doctorID = req.query.doctorID;
  const userID = req.query.userID;
  let doctorName = "";
  let patientName = "";
  let appointmentLocation = "";
  let doctorEmailAddress = "";
  let userEmailAddress = "";
  let appointmentTime = "";
  let appointmentDate = "";
  const doctor = await User.findById({ _id: doctorID });
  const appointment = await AppointmentWithDoctor.findById({
    _id: appointmentID,
  });
  const user = await User.findById({ _id: userID });
  doctorEmailAddress = doctor.email;
  doctorName = doctor.firstName;
  patientName = user.firstName;
  appointmentLocation = doctor.address;
  userEmailAddress = user.email;
  appointmentTime = appointment.appointmentTime;
  appointmentDate = appointment.appointmentDate;

  var transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "axianshaikhy@gmail.com",
      pass: "SP17-BSE-018",
    },
  });
  var mailOptions = {
    from: "info@PharmaDoc.com",
    subject: "Cancelled Appointment",
    html: `
    <h1>Your Appointment Cancelled</h1>
    <h4>Your Your Appointment with Doctor Name:  ${doctorName} and Patient Name:${patientName} at ${appointmentLocation} Date is ${appointmentDate} on ${appointmentTime} is cancelled</h4>

    `,
  };
  var maillist = [userEmailAddress, doctorEmailAddress];
  AppointmentWithDoctor.findByIdAndRemove({ _id: appointmentID })
    .then(async (r) => {
      console.log("res", r);
      maillist.forEach(function async(to, i, array) {
        mailOptions.to = to;
        transpoter.sendMail(mailOptions, function async(error, info) {
          if (error) {
            console.log(error);
          } else {
            res.status(201).json({
              message: {
                msgBody: "Appointment Cancelled Successfully Check Your Email",
                msgError: false,
              },
            });
          }
        });
      });
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});
module.exports = AppointmentRouter;
