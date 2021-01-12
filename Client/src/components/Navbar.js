import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdFingerprint } from "react-icons/md";
import { Button } from "../Button";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";
import AuthService from "../Services/AuthServices";
import Dropdown from "react-bootstrap/Dropdown";

// ContextAPI
import { AuthContext } from "../Context/AuthContext";
function Navbar() {
  // Use ContextAPI
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    const x = 0;

    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  const logoutHandler = () => {
    AuthService.logout()
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authenticatedNavbar = () => {
    return (
      <>
        {" "}
        <li style={{ marginTop: "20px" }}>
          {/* {button ? (
            <Button
              onClick={logoutHandler}
              className="btn-link"
              buttonStyle="btn2--outline"
            >
              Logout
            </Button>
          ) : (
            <Button
              className="btn-link"
              onClick={logoutHandler}
              buttonStyle="btn2--outline"
              buttonSize="btn2--mobile"
            >
              Logout
            </Button>
          )} */}
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-primary"
              id="dropdown-basic"
              // className="site-button"
            >
              {/* <img
                // src={require("../../images/team/noimage.png")}
                alt=""
                width="20"
                height="20"
                className="rounded-circle p-0 mb-1"
              />{" "} */}
              <span>
                {user.firstName} {user.lastName}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className=" rounded ">
              {user.role === "Patient" ? (
                <Dropdown.Item>
                  <Link to={"/userorders"} className="dez-page">
                    My Order
                  </Link>
                </Dropdown.Item>
              ) : (
                ""
              )}
              {user.role === "Patient" ? (
                <Dropdown.Item>
                  <Link to={"/userappointments"}>My Appointment</Link>
                </Dropdown.Item>
              ) : (
                ""
              )}
              <Dropdown.Item>
                <Link to={"/profile"} className="dez-page">
                  Proflile
                </Link>
              </Dropdown.Item>
              <div className="dropdown-divider"></div>
              <Dropdown.Item>
                <Link to={"./"} className="dez-page" onClick={logoutHandler}>
                  Logout
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </>
    );
  };

  const unAuthenticatedNavbar = () => {
    return (
      <>
        <li className="nav-btn">
          {button ? (
            <Link to="/sign-in" className="btn-link">
              <Button buttonStyle="btn2--outline">Sign In</Button>
            </Link>
          ) : (
            <Link to="/sign-in" className="btn-link">
              <Button buttonStyle="btn2--outline" buttonSize="btn--mobile">
                Sign In
              </Button>
            </Link>
          )}
        </li>
        <li className="nav-btn">
          {button ? (
            <Link to="/sign-up" className="btn-link">
              <Button buttonStyle="btn2--outline">Sign Up</Button>
            </Link>
          ) : (
            <Link to="/sign-up" className="btn-link">
              <Button buttonStyle="btn2--outline" buttonSize="btn--mobile">
                Sign Up
              </Button>
            </Link>
          )}
        </li>
      </>
    );
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="fluid-container">
          <div className="row">
            <div className="navbar">
              <div className="col-sm-12">
                <div className="navbar-container">
                  <Link
                    to="/"
                    className="navbar-logo"
                    onClick={closeMobileMenu}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <MdFingerprint className="navbar-icon" />
                    PharmaDoc
                  </Link>
                  <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}
                  </div>
                  <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item ">
                      <Link
                        to="/"
                        className="nav-links"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/medicines"
                        className="nav-links "
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Medicines
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/accreditedlabs"
                        className="nav-links "
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Labs
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/doctors-category"
                        className="nav-links "
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Doctors
                      </Link>
                    </li>
                    {isAuthenticated
                      ? authenticatedNavbar()
                      : unAuthenticatedNavbar()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
