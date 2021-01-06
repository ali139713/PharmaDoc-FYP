import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function DeleteDiagnosisBtn(props) {
  const [showModal, setShowModal] = useState(false);
  const buttonClick = (e) => {
    let deletedRow = props.node.data;
    e.gridApi.updateRowData({ remove: [deletedRow] });
    console.log("Deleted Row : ", deletedRow);
    Axios.delete("/AddDiagnosis/deleteDiagnosis", { params: deletedRow });
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };
  return (
    <div>
      <Link>
        <Button variant="danger" onClick={handleShow}>
          Delete
        </Button>
      </Link>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => buttonClick(props.node)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
