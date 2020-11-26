import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "react-avatar";
import DoctorTabs from "./DoctorTabs";
export default function ViewDoctorProfile() {
  const [name, setName] = useState("Muhammad Asad");
  const [specialization, setSpecialization] = useState(
    "Internal Medicine Specialist"
  );
  const [Education, setEducation] = useState(
    "M.B.B.S, F.C.P.S. (Medicine), Certified Diabetologist (UK)"
  );
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
          <h3>{name}</h3>
          <span>{specialization}</span>
          <span>{Education}</span>
          <hr></hr>
          <DoctorTabs />
        </div>
      </div>
    </div>
  );
}
