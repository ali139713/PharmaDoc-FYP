import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import StarRatings from "react-star-ratings";
import Axios from "axios";
export default function RatingBtn(props) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState();
  const markRating = async (rating) => {
    console.log("NewwwwwRating : ", rating);
    console.log("props of new rating : ", props.data);
    console.log("prescription ID of new rating : ", props.data._id);
    const ratingObject = {
      rating: rating,
      appointmentID: props.data._id,
    };
    await Axios.patch("/appointment/registerRateDoctor", {
      ratingObject,
    })
      .then((res) => res.status(200))
      .catch((err) => console.log("Error : ", err));
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };
  return (
    <div>
      <Link>
        <button onClick={handleShow}>Add Rating</button>
      </Link>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <StarRatings
            rating={rating}
            starRatedColor="#ffd56b"
            starHoverColor="#0d335d"
            changeRating={markRating}
            numberOfStars={5}
            name="rating"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="danger" onClick={onClick}>
            Confirm
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
