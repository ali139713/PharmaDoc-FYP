import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Navbar from "../AliComponents/navbar";
import AuthService from "../../Services/AuthServices";
import "../../style.scss";
import routeLinksUser from "../AliComponents/routeLinksUser";
import UserReportGrid from "../AliComponents/UserReportGrid";
import SpinnerComponent from "../Spinner/Spinner";
import { AuthContext } from "../../Context/AuthContext";

const UserReport = () => {
  const authContext = useContext(AuthContext);
  const [userReport, setUserReport] = useState();
  const [Loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(authContext.user._id);

  const getReport = async () => {
    console.log("USER ID FOR REport : ", userID);

    await Axios.get("http://localhost:5000/labReport/getreport", {
      params: { userID },
    })
      .then((res) => {
        setUserReport(res.data.labs);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    getReport();
  }, []); // component did mount

  console.log("report: ", userReport);

  return (
    <div id="maindiv" className="container-fluid">
      <Navbar links={routeLinksUser} />
      <div className="separation"></div>
      <div className="content">
        <div className="heading">
          <hr />
          <h2> My Lab Test Report</h2>
          <hr />
        </div>
      </div>
      <div style={{ height: "500px" }} className="container">
        <UserReportGrid rowData={userReport} />
      </div>
    </div>
  );
};

export default UserReport;
