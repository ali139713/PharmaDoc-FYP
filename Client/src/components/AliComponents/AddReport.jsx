import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Axios from "axios";
export default function AddReport(props) {
  const onClick = (e) => {
    console.log("eeeeeeeee", e.data);
  };

  return (
    <div>
      <Link>
        <Button onClick={() => onClick(props.node)} variant="primary">
          Add Report
        </Button>
      </Link>
    </div>
  );
}
