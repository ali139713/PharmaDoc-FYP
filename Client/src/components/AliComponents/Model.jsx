import React from 'react';
import Modal from "react-bootstrap/Modal";


const Model = (props) => {
  return(
  <Modal show={props.show} onHide = {props.onHide} size ='lg' centered autoFocus = {true} >
  <Modal.Header><h4>{props.header}</h4></Modal.Header>
  <Modal.Body><h6>{props.bodydesc}</h6><br></br>{props.body}</Modal.Body>
  <Modal.Footer> <button onClick={props.handleClick}> {props.name}</button></Modal.Footer>
</Modal>
  )
};
export default Model;