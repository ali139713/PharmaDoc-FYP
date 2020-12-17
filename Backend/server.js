const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(cors());
// DB Path
const db = require("./config/keys").mongoURI;
// DB Connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected !");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());

const userRouter = require("./routes/User");
const medicineRouter = require("./routes/Medicine");
const AppointmentRouter = require("./routes/AppointmentWithDoctor");
const labRouter = require("./routes/Lab");
const labtestRouter = require("./routes/LabTest");
const orderRouter = require("./routes/Order");
const stripeRouter = require("./routes/Stripe");
const labtestOrderRouter = require("./routes/LabTestOrder");
const pharmacyRouter = require("./routes/Pharmacy");
const PrescriptionRouter = require("./routes/AddPrescription");

app.use("/user", userRouter);
app.use("/medicine", medicineRouter);
app.use("/appointment", AppointmentRouter);
app.use("/lab", labRouter);
app.use("/labtest", labtestRouter);
app.use("/order", orderRouter);
app.use("/stripe", stripeRouter);
app.use("/labtestorder", labtestOrderRouter);
app.use("/pharmacy", pharmacyRouter);
app.use("/AddPrescription", PrescriptionRouter);

//   port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
