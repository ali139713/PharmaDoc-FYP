import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";

const Card = (props) => {
  const linkTo = props.linkTo ? props.linkTo : false;
  return (
    <div className="card col-md-3" onClick={props.handleClick}>
      <Link to={linkTo} style={{ color: "black", textDecoration: "inherit" }}>
        <h5>{props.heading}</h5>
        <img className="card-img-top" src={props.pic} />
        <div className="card-body">
          <p className="card-text">{props.description}</p>
          <p className="card-text">{props.price}</p>
          {/* <Button name ={props.name} className = "btn btn-primary"/> */}
        </div>
      </Link>
    </div>
  );
};

export default Card;
