import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
export default function DeletePrescriptionBtn(props) {
  const [showModal, setShowModal] = useState(false);
  const buttonClick = (e) => {
    console.log("eeeeeee", e);
    let deletedRow = props.node.data;
    console.log("deleted Row: ", deletedRow);
    e.gridApi.updateRowData({ remove: [deletedRow] });

    Axios.delete("/AddPrescription/deletePrescription", {
      params: deletedRow,
    }).then();
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
          <Button variant="secondary" onClick={handleClose}>
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
