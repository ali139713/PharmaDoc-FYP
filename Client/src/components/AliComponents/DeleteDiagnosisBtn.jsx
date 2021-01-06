import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Axios from "axios";
export default function DeleteDiagnosisBtn(props) {
  const buttonClick = (e) => {
    let deletedRow = props.node.data;

    e.gridApi.updateRowData({ remove: [deletedRow] });
    console.log("Deleted Row : ", deletedRow);
  };
  return (
    <Link>
      <Button variant="danger" onClick={() => buttonClick(props.node)}>
        Delete
      </Button>
    </Link>
  );
}
