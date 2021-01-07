import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import Navbar from "../AliComponents/navbar";
import "../../style.scss";
import routeLinks from "../AliComponents/routeLinksUser";
import ActiveAppointmentGrid from "../AliComponents/ActiveAppointmentGrid";
import CompletedAppointmentGrid from "../AliComponents/CompletedAppointmentGrid";
import SpinnerComponent from "../../components/Spinner/Spinner";
// import Tab from "../AliComponents/tabs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// ContextAPI
import { AuthContext } from "../../Context/AuthContext";

const Userappointments = () => {
  const authContext = useContext(AuthContext);
  var [userAppointment, setUserAppointment] = useState(0);
  var [activeUserAppointment, setActiveUserAppointment] = useState(0);
  var [completedUserAppointment, setCompletedUserAppointment] = useState(0);
  var [userID, setUserID] = useState(authContext.user._id);
  const [isLoaded, setisLoaded] = useState(false);

  const appointmentofUser = async () => {
    let activeAppointment = [];
    let completedAppointment = [];
    await Axios.get("/appointment/getAppointments", {
      params: {
        userID: userID,
      },
    }).then(async (res) => {
      // console.log("appointments", res.data.appointments);
      for await (let variable of res.data.appointments) {
        console.log("variable : ", variable.appointmentDate);
        if (new Date(variable.appointmentDate) - new Date() > 0) {
          activeAppointment.push(variable);
        } else {
          completedAppointment.push(variable);
        }
      }
    });
    console.log("activeAppointment", activeAppointment);
    console.log("completedAppointment", completedAppointment);
    await setActiveUserAppointment(activeAppointment);
    await setCompletedUserAppointment(completedAppointment);
    //   console.log(authContext.isLoaded)
    //   authContext.setIsLoaded(true)
    setisLoaded(true);
  };

  useEffect(() => {
    appointmentofUser();
  }, []);

  // console.log(authContext.isLoaded)
  if (isLoaded === false) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <SpinnerComponent />
      </div>
    );
  } else {
    return (
      <div id="maindiv" className="container-fluid">
        <Navbar links={routeLinks} />
        <div className="separation"></div>
        <div className="content">
          <div className="heading">
            <hr />
            <h2> My Appointments... </h2>
            <hr />
          </div>
        </div>
        {/* <Tab name="Active" secondName="Completed" /> */}
        <Tabs>
          <TabList>
            <Tab>Active</Tab>
            <Tab>Completed</Tab>
          </TabList>
          <TabPanel>
            <div style={{ height: "500px" }}>
              <ActiveAppointmentGrid rowData={activeUserAppointment} />
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ height: "500px" }}>
              <CompletedAppointmentGrid rowData={completedUserAppointment} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
};

export default Userappointments;
