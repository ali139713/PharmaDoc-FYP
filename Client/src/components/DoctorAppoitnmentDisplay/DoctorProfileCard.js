import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import Avatar from "react-avatar";
import AuthService from "../../Services/AuthServices";
import { Button } from "reactstrap";
import { NavLink, Link, Redirect } from "react-router-dom";
import "./DoctorProfileCard.css";
// ContextAPI
import { AuthContext } from "../../Context/AuthContext";

const DoctorProfileCard = () => {
  const authContext = useContext(AuthContext);

  const [img, setImg] = useState(
    "https://raw.githubusercontent.com/GedalyaKrycer/unit-19-react-homework-employee-directory/master/my-app/src/img/richard-stevens-img.png"
  );

  const [specilizaton, setSpecilizaton] = useState("ENT");
  const [education, setEducation] = useState("MBBS,FCPS");
  const [Fee, setFee] = useState(500);
  const [location, setLocation] = useState("Lahore");
  const [phone, setphone] = useState("0300-8189126");
  var [doctorInfo, setDoctorInfo] = useState([]);

  const getDoctors = async () => {
    const response = await Axios.get("/user/getDoctors");
    setDoctorInfo(response.data.doctors);
  };

  useEffect(() => {
    getDoctors();
  }, []);
  console.log("doctorInfo", doctorInfo);
  const DoctorCardDisplay = doctorInfo.map((doctor) => {
    return (
      <div key={doctor._id} className="container rounded my-5 py-2 customCard">
        <div className="row">
          <div className="col-sm-4">
            <Avatar
              style={{ margin: "5%" }}
              src="https://raw.githubusercontent.com/GedalyaKrycer/unit-19-react-homework-employee-directory/master/my-app/src/img/richard-stevens-img.png"
              size="160"
              round={true}
            />
          </div>
          <div className="col-sm-5">
            <div style={{ justifyContent: "center" }}>
              <h3>
                {doctor.firstName} {doctor.lastName}
              </h3>
              <p className="mb-0">
                {doctor.specialization
                  ? doctor.specialization + " Specialist"
                  : " "}
              </p>
              <p>{doctor.certificates}</p>
              <h5>{doctor.address}</h5>
              <h4>{doctor.email}</h4>
              <h5>{doctor.cellNumber}</h5>
              <div>
                <h4>Fee:{doctor.fee} </h4>{" "}
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div style={{ marginTop: "15px" }}>
              <Link to={`/doctors-cards/book-appointment/${doctor._id}`}>
                {" "}
                <Button
                  onClick={() => {
                    authContext.setDoctorID(doctor._id);
                  }}
                  className="BnSetting"
                  style={{ padding: "1.2em" }}
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
            <div style={{ marginTop: "15px" }}>
              <NavLink to="/doctor-profile">
                <Button className="BnSetting">View Profile</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className="container-fluid">{DoctorCardDisplay}</div>;
};
export default DoctorProfileCard;
