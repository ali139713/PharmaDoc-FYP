import React from "react";
import { Link } from "react-router-dom";

export default function BtnCellRenderer(props) {
  const btnClickedHandler = () => {
    console.log("props", props.data.doctorID);
    localStorage.setItem('doctorID',props.data.doctorID);
  };

  return (
    <Link to="/room">
      {" "}
      <button onClick={btnClickedHandler}>Video Call</button>{" "}
    </Link>
  );
}