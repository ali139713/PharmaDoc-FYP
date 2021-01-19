import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
export default function AddReport(props) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [newPostErrors, setNewPostErrors] = useState([]);

  const [userData, setUserData] = useState();

  const onClick = (e) => {
    console.log("eeeeeeeee", e.data);
    setUserData(e.data);
    handleShow();
  };
  const handleClose = () => {
    setShow(false);
    setNewPostErrors([]);
  };

  const handleShow = () => {
    setShow(true);
    setFile("");
    setNewPostErrors([]);
  };
  return (
    <div>
      <Link>
        <Button onClick={() => onClick(props.node)} variant="primary">
          Add Report
        </Button>
      </Link>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {newPostErrors.map((error, index) => (
              <div className="alert alert-danger" role="alert" key={index}>
                {error}
              </div>
            ))}
            <Form.Group>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setNewPostErrors([]);

                    let reader = new FileReader();
                    let file = e.target.files[0];
                    console.log("Fileeee", file);
                    let fileSize = (file.size / 1024 / 1024).toFixed(4);
                    reader.onloadend = () => {
                      if (fileSize <= 5) {
                        setFile(file);
                      } else {
                        setNewPostErrors(["File size is more than 5 MB."]);
                        window.scrollTo(0, 0);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              ></input>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!file}
            onClick={() => {
              let formData = new FormData();
              formData.append("file", file);
              console.log("userDAtaaaaa : ", userData);
              formData.append("userEmail", userData.userEmail);
              formData.append("price", userData.price);
              formData.append("testName", userData.name);
              formData.append("lab", userData.lab);
              formData.append("description", userData.description);
              formData.append("userID", userData.userID);
              formData.append("testOrderID", userData._id);

              console.log("objecttttt of file", formData);
              Axios.post("/labReport/postreport", formData)
                .then((res) => handleClose())
                .catch((err) => setNewPostErrors([err.message]));
            }}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
