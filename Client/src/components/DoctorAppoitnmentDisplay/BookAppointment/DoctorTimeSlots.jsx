import React, { useEffect, useState, useContext } from "react";
import DatePickerForAppointment from "./DatePickerForAppointment";
import "./DoctorTimeSlots.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "@material-ui/core/Button";
import Axios from "axios";
// ContextAPI
import { AuthContext } from "../../../Context/AuthContext";
import SpinnerComponent from "../../../components/Spinner/Spinner";
export default function Doctortimeslots(props) {
  // set Value in ContextAPI
  const authContext = useContext(AuthContext);
  const [allIntervals, setAllIntervals] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [phone, setPhone] = useState();
  const [timeValue, setTimeValue] = useState();
  const [appointmentDate, setAppointmentDate] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [filterValues, setFilterValues] = useState(false);

  const getAppointmentDateFromChild = async (childData) => {
    childData.setDate(childData.getDate() + 1);
    setAppointmentDate(childData);
    setShowTimeSlots(true);
    authContext.setAppointmentDate(childData);

    await Axios.post("/appointment/disabledAppointments", {
      doctorID: props.doctorID,
      appointmentDate: new Date(childData),
    }).then((res) => {
      setIsLoaded(true);

      setBookedAppointments(res.data);
      let registerAppointments = [];

      res.data.forEach((element) => {
        registerAppointments.push(element.appointmentTime);
      });

      function arrayRemove(arr, value) {
        return arr.filter(function (ele) {
          return ele != value;
        });
      }
      let newArray = allIntervals;
      registerAppointments.forEach((element) => {
        newArray = arrayRemove(newArray, element);
      });

      setIntervals(newArray);

      console.log("Appointemented Time Slots: ", registerAppointments);
      console.log("Filtered Time Slots: ", newArray);

      // const { message } = res.data;
      // setMessage(message);
      // timerID = setTimeout(() => {
      //   props.history.push("/userappointments");
      // }, 2000);
      // authContext.setAppointmentDate("");
      // authContext.setAppointmentTimeCell("");
    });
  };

  const genrateAppointmentSlots = async () => {
    try {
      const res = await Axios.get("/user/getUser", {
        params: {
          _id: props.doctorID,
        },
      });
      if (res.status === 200) {
        setIsLoaded(true);
        timeSlotCalculaton(
          res.data.users[0].startTime,
          res.data.users[0].endTime,
          parseInt(res.data.users[0].apointmentInterval)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    genrateAppointmentSlots();
  }, []);

  const timeSlotCalculaton = (sTime, eTime, sDuration) => {
    if (sTime !== null && eTime !== null) {
      let array = [];
      setIntervals(array);

      const startTimeHours = parseInt(sTime.toString().substring(0, 2));
      const endTimeHours = parseInt(eTime.toString().substring(0, 2));
      const startTimeMinutes = parseInt(sTime.toString().substring(3, 5));
      const endTimeMinutes = parseInt(eTime.toString().substring(3, 5));

      let TotalMinutesTime1 = startTimeHours * 60 + startTimeMinutes;
      const TotalMinutesTime2 = endTimeHours * 60 + endTimeMinutes;

      let slots = [];
      let count = 0;

      while (TotalMinutesTime1 < TotalMinutesTime2) {
        if (count !== 0) {
          TotalMinutesTime1 = TotalMinutesTime1 + sDuration;
        }

        const FinalTimeHours1 = parseInt(TotalMinutesTime1 / 60);
        const FinalTimeMinutes1 = parseInt(TotalMinutesTime1 % 60);
        const time1Slot =
          FinalTimeHours1 +
          ":" +
          (FinalTimeMinutes1 === 0 ? "00" : FinalTimeMinutes1);
        if (TotalMinutesTime1 > TotalMinutesTime2) {
          break;
        } else slots.push(time1Slot);
        count++;
      }
      setAllIntervals(slots);
      console.log("Total Time Slots: ", slots);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const timeValue = e.currentTarget.textContent;
    setTimeValue(timeValue);
    authContext.setAppointmentTimeCell({
      appointmentTime: timeValue,
      cellNumber: phone,
    });
  };

  if (isLoaded === false) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <DatePickerForAppointment parentCallBack={getAppointmentDateFromChild} />
      <div
        style={{
          borderRadius: "10px",
        }}
        className="container-fluid  border border-dark shadow-sm my-5"
      >
        <div className="row">
          <div className="col-sm-3 col-md-3">
            <h4>Time :</h4>
          </div>
          <div className="col-sm-9 col-md-9">
            {showTimeSlots &&
              isLoaded &&
              intervals.map((timeSlots) => (
                <Button
                  key={timeSlots}
                  onClick={handleChange}
                  className={
                    timeValue + "" === timeSlots + ""
                      ? " m-2  selected"
                      : " m-2 unselected"
                  }
                  variant="contained"
                  color="primary"
                >
                  {timeSlots}
                </Button>
              ))}

            {/* {showTimeSlots &&
              isLoaded &&
              intervals.map((timeSlots) => (
                <Button
                  key={timeSlots}
                  onClick={handleChange}
                  className={
                    timeValue + "" === timeSlots + ""
                      ? " m-2  selected"
                      : " m-2 unselected"
                  }
                  variant="contained"
                  color="primary"
                >
                  {timeSlots}
                </Button>
              ))
              } */}
          </div>
        </div>
      </div>
      <div
        style={{
          borderRadius: "5px",
        }}
        className="container-fluid  border border-dark shadow-sm my-5"
      >
        <div className="row my-3">
          <div className="col-sm-3 col-md-3">
            {" "}
            <h4>Phone :</h4>
          </div>
          <div className="col-sm-9 col-md-9">
            <PhoneInput
              style={{ width: "max" }}
              country={"pk"}
              disableDropdown={true}
              required={true}
              value={phone}
              placeholder={phone}
              countryCodeEditable={false}
              onChange={(phone) => {
                setPhone(phone);
                authContext.setAppointmentTimeCell({
                  appointmentTime: timeValue,
                  cellNumber: phone,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
