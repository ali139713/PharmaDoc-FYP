import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./TimeIntervals.css";
function Timeintervals(props) {
  const [selectedBtn, setSelectedBtn] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setSelectedBtn(true);
    const aray1 = e.currentTarget.textContent;
    console.log(aray1);
  };
  // const onSelect = () => {

  // };

  return (
    <>
      <Button
        // onSelect={onSelect}
        onClick={handleChange}
        className={"m-2 " + (selectedBtn ? " selected " : " unselected")}
        variant="contained"
        color="primary"
      >
        {props.timeSlots}
      </Button>
    </>
  );
}

export default Timeintervals;
