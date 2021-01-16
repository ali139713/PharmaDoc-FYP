require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
app.use(cookieParser());
app.use(cors());

const server = http.createServer(app);
const socket = require("socket.io");

const io = socket(server);

const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  socket.emit("your id", socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
  socket.on("sendVideoLink", (videoLink) => {
    io.emit("videolink", videoLink);
  });
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

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
const DiagnosisRouter = require("./routes/AddDiagnosis");

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
app.use("/AddDiagnosis", DiagnosisRouter);

//   port
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
// app.listen(port, () => {
//   console.log(`Server Started on Port ${port}`);
// });
