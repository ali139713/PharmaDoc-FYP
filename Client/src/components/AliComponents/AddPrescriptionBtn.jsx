import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
export default function AddPrescription(props) {
  const authContext = useContext(AuthContext);
  const [userID, setUserID] = useState(props.data.userID);
  const [doctorID, setDoctorID] = useState(props.data.doctorID);
  const btnClickedHandler = () => {
    authContext.setDoctorID(props.data.doctorID);
  };
  console.log("user ID BTN", userID);
  console.log("doctor ID BTN", doctorID);
  return (
    <Link to={`/doctorappointments/addPrescription/${userID}/${doctorID}`}>
      <button onClick={btnClickedHandler}>Add Prescription</button>
    </Link>
  );
}
