import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import Navbar from "../AliComponents/navbar";
import "../../style.scss";
import routeLinks from "../AliComponents/routeLinksUser";
import UserPrescriptionGrid from "../AliComponents/UserPrescriptionGrid";
import SpinnerComponent from "../../components/Spinner/Spinner";
import Tab from "../AliComponents/tabs";
// ContextAPI
import { AuthContext } from "../../Context/AuthContext";

const Userappointments = () => {
  const authContext = useContext(AuthContext);
  var [userPrescription, setUserPrescription] = useState();
  var [userID, setUserID] = useState(authContext.user._id);
  const [isLoaded, setisLoaded] = useState(false);

  const appointmentofUser = async () => {
    await Axios.get("/AddPrescription/getPrescription", {
      params: {
        userID: userID,
      },
    }).then(async (res) => {
      let array = [];

      // console.log("res of prescription", res.data);

      // for await (let variable of res.data) {
      //   for await (let arr of variable.prescription) {
      //     array.push(arr);

      //   }
      // }

      for await (let variable of res.data) {
        for await (let arr of variable.prescription) {
          arr.doctorName = variable.doctorName;
          arr.prescriptionID = variable.prescriptionID;
          // console.log("Arr : ", arr);
          array.push(arr);
        }
      }

      // const obj = {
      //   prescription: array,
      //   doctorName: res.data[0].doctorName,
      // };
      setUserPrescription(array);
      console.log("new Array", array);
    });
  };
  // console.log("user Prescription Field", userPrescription);
  useEffect(() => {
    appointmentofUser();
  }, []);

  if (isLoaded === true) {
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
            <h2> My Prescription... </h2>
            <hr />
          </div>
        </div>

        <Tab name="Active" secondName="Completed" />

        <div style={{ height: "500px" }}>
          <UserPrescriptionGrid rowData={userPrescription} />
        </div>
      </div>
    );
  }
};

export default Userappointments;
