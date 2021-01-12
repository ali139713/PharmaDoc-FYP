import React, { useState, useContext, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "react-avatar";
import DoctorTimeSlots from "./DoctorTimeSlots";
import "./BookAppointment.css";
// ContextAPI
import { AuthContext } from "../../../Context/AuthContext";
// AuthServices
import AuthService from "../../../Services/AuthServices";
import SpinnerComponent from "../../../components/Spinner/Spinner";
import Message from "../../Message";
import Error from "../../../components/Error";
import Axios from "axios";
// import SpinnerComponent from "../../../components/Spinner/Spinner";
export default function BookAppointment(props) {
  const authContext = useContext(AuthContext);
  let timerID = useRef(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState(authContext.error.isError);
  const [message, setMessage] = useState(null);
  const {
    match: { params },
  } = props;
  let [doctorID, setDoctorID] = useState(params.id);
  let [userID, setUserID] = useState();
  const [specialization, setSpecialization] = useState();
  const [Education, setEducation] = useState();
  const [profileImage, setProfileImage] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const doctorProfileInfo = async () => {
    setIsLoaded(true);
    await Axios.get("/user/getUser", {
      params: {
        _id: doctorID,
      },
    }).then((res) => {
      setFirstName(res.data.users[0].firstName);
      setLastName(res.data.users[0].lastName);
      setSpecialization(res.data.users[0].specialization);
      setEducation(res.data.users[0].certificates);
      setProfileImage(res.data.users[0].profilePicture);
    });
  };
  const placeAppointment = async () => {
    setIsLoaded(true);

    if (
      authContext.appointmentDate &&
      authContext.appointmentTimeCell &&
      authContext.appointmentTimeCell.appointmentTime &&
      authContext.appointmentTimeCell.cellNumber !== null &&
      authContext.appointmentTimeCell.cellNumber !== undefined
        ? true
        : false
    ) {
      const appointment = {
        doctorID: doctorID,
        userID: authContext.user._id,
        userEmail: authContext.user.email,
        appointmentDate: authContext.appointmentDate,
        appointmentTime: authContext.appointmentTimeCell.appointmentTime,
        cellNumber: authContext.appointmentTimeCell.cellNumber,
      };

      console.log("appointment: ", appointment);

      await Axios.post("/appointment/registerAppointment/:id", {
        appointment,
      }).then((res) => {
        setIsLoaded(false);
        console.log("res", res);
        const { message } = res.data;
        setMessage(message);
        timerID = setTimeout(() => {
          props.history.push("/userappointments");
        }, 2000);
        authContext.setAppointmentDate("");
        authContext.setAppointmentTimeCell("");
      });
    } else {
      setIsLoaded(false);

      authContext.setError({
        isError: true,
        errorMsg: "Fields are Empty",
      });
    }
  };

  useEffect(() => {
    doctorProfileInfo();
    AuthService.isAuthenticated().then((data) => {
      authContext.setUser(data.user);
      setUserID(data.user._id);
      setIsLoaded(false);
    });

    return () => {
      clearTimeout(timerID);
    };
  }, []);
  // if (isLoaded) {
  //   return <SpinnerComponent />;
  // } else
  return (
    <div style={{ textAlign: "center" }} className={"container mb-5"}>
      <div className="row border border-dark rounded shadow-sm my-5 p-1">
        <div className="col-sm-3">
          <Avatar
            // src="https://raw.githubusercontent.com/GedalyaKrycer/unit-19-react-homework-employee-directory/master/my-app/src/img/richard-stevens-img.png"
            src={profileImage}
            size="160"
            round={true}
          />
        </div>
        <div className="col-sm-5">
          <h3>
            {firstName} {lastName}
          </h3>
          <span>{specialization}</span>
          <br />
          <span>{Education}</span>
          <hr></hr>
          <div>
            <DoctorTimeSlots doctorID={doctorID} /> <hr></hr>
            {isLoaded ? <SpinnerComponent /> : null}
            {message ? <Message message={message} /> : null}
            {authContext.error.isError ? (
              <Error message={authContext.error.errorMsg} />
            ) : null}
            <Button onClick={placeAppointment} className="m-3 bookAppBtn">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
