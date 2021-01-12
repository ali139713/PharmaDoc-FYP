import React, { Component, useContext, useState, useEffect } from "react";
import Navbar from "../AliComponents/navbar";
import "../../style.scss";
import "../AliComponents/form.scss";
import routeLinks from "../AliComponents/routeLinks";
import ActiveDoctorAppointmentsGrid from "../AliComponents/ActiveDoctorAppointmentsGrid";
import CompletedDoctorAppointmentGrid from "../AliComponents/CompletedDoctorAppointmentGrid";
import Axios from "axios";
import SpinnerComponent from "../../components/Spinner/Spinner";
import "./Doctorappointments.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// ContextAPI
import { AuthContext } from "../../Context/AuthContext";

const Doctorappointments = () => {
  const authContext = useContext(AuthContext);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [apointmentInterval, setAppointmentInterval] = useState();
  var [activeDoctorAppointment, setActiveDoctorAppointment] = useState(0);
  var [completedDoctorAppointment, setCompletedDoctorAppointment] = useState(0);
  var [doctorID, setDoctorID] = useState(authContext.user._id);
  const [isLoaded, setisLoaded] = useState(false);

  const validate = () => {
    if (this.state.startTime && this.state.endTime && this.state.intervalSlot) {
      return false;
    } else {
      return true;
    }
  };

  const appointmentofDoctor = async () => {
    let activeAppointment = [];
    let completedAppointment = [];
    await Axios.get("/appointment/getAppointments", {
      params: {
        doctorID: doctorID,
      },
    }).then(async (res) => {
      // setDoctorAppointment(res.data.appointments);
      for await (let variable of res.data.appointments) {
        console.log("variable : ", variable.appointmentDate);
        if (new Date(variable.appointmentDate) - new Date() > 0) {
          activeAppointment.push(variable);
        } else {
          completedAppointment.push(variable);
        }
      }
      console.log("Active Doctor Appointments : ", activeAppointment);
      console.log("Comp Doctor Appointments : ", completedAppointment);
      setActiveDoctorAppointment(activeAppointment);
      setCompletedDoctorAppointment(completedAppointment);
    });
    setisLoaded(true);
  };

  const appointmentTimeSet = async () => {
    await Axios.get("/user/getUser", {
      params: {
        _id: authContext.user._id,
      },
    }).then(async (res) => {
      console.log("res of Time ", res.data.users[0]);
      setStartTime(res.data.users[0].startTime);
      setEndTime(res.data.users[0].endTime);
      setAppointmentInterval(res.data.users[0].apointmentInterval);
    });
  };

  useEffect(() => {
    appointmentofDoctor();
    appointmentTimeSet();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const ID = authContext.user._id;
    Axios.patch("/user/update/doctorProfile/" + ID, {
      startTime: startTime,
      endTime: endTime,
      apointmentInterval: apointmentInterval,
    })

      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("ID", doctorID);
  // console.log("doctorAppointment", doctorAppointment);
  if (isLoaded === false) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <SpinnerComponent />
      </div>
    );
  } else {
    return (
      <div>
        <div id="maindiv" className="container-fluid">
          <Navbar links={routeLinks} />
          <div className="separation"></div>
          <h2 style={{ marginLeft: "42%", marginBottom: "2%" }}>
            {" "}
            Appointment Info...{" "}
          </h2>
          <div className="content container-fluid">
            <div className="container" style={{ width: "70%" }}>
              <div className="form">
                <form onSubmit={onSubmit}>
                  <div className="form-row">
                    <div className="form-group  col-md-6">
                      <span> Start Time </span>
                      <select
                        className="scrollable-menu"
                        id="startTime"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                        }}
                      >
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <span> End Time </span>
                      <select
                        id="endTime"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => {
                          setEndTime(e.target.value);
                        }}
                      >
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <span> Interval slot </span>
                    <select
                      id="intervalSlot"
                      name="intervalSlot"
                      value={apointmentInterval}
                      onChange={(e) => {
                        setAppointmentInterval(e.target.value);
                      }}
                    >
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="30">30</option>
                    </select>
                  </div>

                  <button
                    disabled={validate}
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginTop: "10%" }}
                  >
                    Update
                  </button>
                </form>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>

        <div>
          <Tabs>
            <TabList>
              <Tab>Active</Tab>
              <Tab>Completed</Tab>
            </TabList>
            <TabPanel>
              <div style={{ height: "500px" }}>
                <ActiveDoctorAppointmentsGrid
                  rowData={activeDoctorAppointment}
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div style={{ height: "500px" }}>
                <CompletedDoctorAppointmentGrid
                  rowData={completedDoctorAppointment}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
};

export default Doctorappointments;
