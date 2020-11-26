import React from "react";
import "./FrontOfCard.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import LazyLoad from "react-lazyload";

function FrontOfCard({
  firstName,
  lastName,
  title,
  location,
  phone,
  email,
  img,
  fee,
}) {
  return (
    <div className="card-container">
      <div className="card-intro text-color">
        <LazyLoad>
          <img src={img} alt={firstName} />
        </LazyLoad>

        <h2>{firstName}</h2>
        <h2>{lastName}</h2>
        <h3>{title}</h3>
      </div>
      <hr />
      <div className="card-contact">
        <ul>
          <li>
            <FaMapMarkerAlt />{" "}
            <a
              style={{ textDecoration: "none", color: "white" }}
              className="InnerText"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/place/${location}`}
            >
              {location}
            </a>
          </li>
          <li>
            <FaPhoneAlt />{" "}
            <a
              className="InnerText"
              href={`tel:${phone}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {phone}
            </a>
          </li>
          <li>
            <FaEnvelope />{" "}
            <a
              className="InnerText"
              href={`mailto:${email}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {email}
            </a>
          </li>
          <li>
            <i className="fas fa-dollar-sign"></i>

            <span style={{ marginLeft: "10px" }}>{fee}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FrontOfCard;
