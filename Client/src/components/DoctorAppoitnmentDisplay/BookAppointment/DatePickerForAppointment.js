import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
// ContextAPI
import { AuthContext } from "../../../Context/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
function DatePickerForAppointment(props) {
  const authContext = useContext(AuthContext);
  const [startDate, setStartDate] = useState();
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  const onChange = (date) => {
    console.log("date for disable", new Date(date));
    props.parentCallBack(new Date(date));
    setStartDate(new Date(date));
  };
  return (
    <div
      style={{
        borderRadius: "10px",
      }}
      className="container-fluid  border border-dark shadow-sm my-5"
    >
      <div style={{ marginTop: "15px", marginBottom: "15px" }} className="row">
        <div className="col-sm-3">
          <h4>Date:</h4>
        </div>
        <div className="col-sm-6">
          <DatePicker
            required={true}
            selected={startDate}
            onChange={onChange}
            filterDate={isWeekday}
            value={startDate}
          />
        </div>
      </div>
    </div>
  );
}
export default DatePickerForAppointment;
