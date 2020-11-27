import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "react-avatar";
import DoctorTabs from "./DoctorTabs";
export default function ViewDoctorProfile(props) {
  const {
    match: { params },
  } = props;
  let [doctorID, setDoctorID] = useState(params.id);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [specialization, setSpecialization] = useState();
  const [Education, setEducation] = useState();

  const doctorProfileInfo = async () => {
    await Axios.get("/user/getUser", {
      params: {
        _id: doctorID,
      },
    }).then((res) => {
      setFirstName(res.data.users[0].firstName);
      setLastName(res.data.users[0].lastName);
      setSpecialization(res.data.users[0].specialization);
      setEducation(res.data.users[0].certificates);
    });
  };

  useEffect(() => {
    doctorProfileInfo();
  });
  return (
    <div
      className={
        "container " +
        (window.outerHeight < document.querySelector("body").scrollHeight
          ? ""
          : "vh-100")
      }
    >
      <div className="row border border-dark rounded shadow-sm my-5 p-1">
        <div className="col-sm-3">
          <Avatar
            src="https://raw.githubusercontent.com/GedalyaKrycer/unit-19-react-homework-employee-directory/master/my-app/src/img/richard-stevens-img.png"
            size="160"
            round={true}
          />
        </div>
        <div className="col-sm-5">
          <h3>
            {firstName} {lastName}
          </h3>
          <span>{specialization}</span>
          <br></br>
          <span>{Education}</span>
          <hr></hr>
          <DoctorTabs />
        </div>
      </div>
    </div>
  );
}
