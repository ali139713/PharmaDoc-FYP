import React, { useState } from "react";
import "./BackOfCard.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Button } from "reactstrap";
import { NavLink, Redirect } from "react-router-dom";
function BackOfCard({ location, phone, email, fee }) {
  return (
    <div className="card-container">
      <div className="card-intro text-color">
        <NavLink to="/book-appointment">
          {" "}
          <Button className="BnSetting" style={{ padding: "1.2em" }}>
            Book Appointment
          </Button>
        </NavLink>

        <NavLink to="/doctor-profile">
          <Button className="BnSetting" variant="light">
            View Profile
          </Button>
        </NavLink>
      </div>
      <hr />
      <div className="card-contact">
        <ul>
          <li>
            <FaMapMarkerAlt />{" "}
            <a
              className="InnerText"
              style={{ color: "white" }}
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.google.com/maps/place/${location}`}
            >
              {location}
            </a>
          </li>
          <li>
            <FaPhoneAlt />{" "}
            <a
              style={{ textDecoration: "none", color: "white" }}
              className="InnerText"
            >
              {phone}
            </a>
          </li>
          <li>
            <FaEnvelope />{" "}
            <a
              style={{ textDecoration: "none", color: "white" }}
              className="InnerText"
            >
              {email}
            </a>
          </li>
          <li>
            {/* <i class="fas fa-dollar-sign"></i> */}
            <FaEnvelope />{" "}

            <span style={{ marginLeft: "10px" }}>{fee}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BackOfCard;
