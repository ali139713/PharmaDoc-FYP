import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import Navbar from "../AliComponents/navbar";
import "../../style.scss";
import routeLinks from "../AliComponents/routeLinksUser";
import GridExample from "../AliComponents/patientAppointments";
import Tab from "../AliComponents/tabs";
// ContextAPI
import { AuthContext } from "../../Context/AuthContext";

const Userappointments = () => {
  const authContext = useContext(AuthContext);
  var [userAppointment, setUserAppointment] = useState(0);
  var [userID, setUserID] = useState(authContext.user._id);
  const [isLoaded, setisLoaded] = useState(false);

  const appointmentofUser = async () => {
    await Axios.get("/appointment/getAppointments", {
      params: {
        userID: userID,
      },
    }).then((res) => setUserAppointment(res.data.appointments));
    //   console.log(authContext.isLoaded)
    //   authContext.setIsLoaded(true)
    setisLoaded(true);
  };

  useEffect(() => {
    appointmentofUser();
  }, []);
  console.log("ID", userID);
  console.log(userAppointment);
  // console.log(authContext.isLoaded)
  if (isLoaded === false) {
    return (
      <div>
        {" "}
        <i className="fas fa-spinner"></i>{" "}
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

        <Tab name="Active" secondName="Completed" />

        <div style={{ height: "500px" }}>
          <GridExample rowData={userAppointment} />
        </div>
      </div>
    );
  }
};

export default Userappointments;
