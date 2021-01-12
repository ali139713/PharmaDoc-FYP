import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function DoctorRating(props) {
  const classes = useStyles();
  let [doctorID, setDoctorID] = useState(props.doctorID);
  let [totalRating, setTotalRating] = useState(0);
  let [countPersons, setCountPersons] = useState(0);
  const [finalRating, setFinalRating] = useState(0);

  const getDoctorRate = async () => {
    await Axios.get("/appointment/getdoctorrating", {
      params: { _id: doctorID },
    })
      .then(async (res) => {
        for await (let variable of res.data.appointments) {
          console.log("res of rating Doctor Get ", variable);
          if (variable.rating !== undefined) {
            totalRating = totalRating + variable.rating;
            countPersons = countPersons + 1;
          }
        }

        setTotalRating(totalRating);
        setCountPersons(countPersons);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const calfinalRating = async () => {
    const final = totalRating / countPersons;
    console.log("f:", final);
    await setFinalRating(final);
  };
  console.log("final : ", finalRating);
  useEffect(() => {
    getDoctorRate();
    calfinalRating();
  }, []);
  // console.log("props to get Rate Doctor", doctorID);
  return (
    <div className={classes.root}>
      <Rating
        name="half-rating-read"
        // defaultValue={2}
        value={finalRating}
        readOnly
      />{" "}
      {countPersons > 1 ? `${countPersons} reviews` : `${countPersons} review`}{" "}
    </div>
  );
}
