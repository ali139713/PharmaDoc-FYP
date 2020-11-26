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

  let appointmentData = {};

  if (userID) {
    await AppointmentWithDoctor.find({ userID })
      .select(
        " _id doctorID userID appointmentDate appointmentTime cellNumber  "
      )
      .exec()
      .then(async (appointments) => {
        let newAppointments = [];

        for await (appointment of appointments) {
          dId = appointment.doctorID;
          let doctorData = {};

          await User.findById({ _id: dId })
            .select("_id firstName lastName ")
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
  } else {
    AppointmentWithDoctor.find({ doctorID })
      .select(
        " _id doctorID userID appointmentDate appointmentTime cellNumber  "
      )
      .exec()
      .then((appointments) => {
        const response = {
          count: appointments.length,
          appointment: appointments.map((appointment) => {
            // console.log(appointment);
            return {
              _id: appointment._id,
              doctorID: appointment.doctorID,
              userID: appointment.userID,
              appointmentDate: appointment.appointmentDate,
              appointmentTime: appointment.appointmentTime,
              cellNumber: appointment.cellNumber,
            };
          }),
        };
        res.status(200).json(response);
        // console.log(response);
      })
      .catch((err) => {
        // console.log(err);
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

module.exports = AppointmentRouter;
