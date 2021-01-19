import React from "react";
import "./navbar.scss";
import { BrowserRouter as Link, NavLink } from "react-router-dom";

const NavBarItem = ({ link }) => {
  return (
    <NavLink className="nav-link" to={link.path}>
      {link.label}
      <span className="sr-only"></span>
    </NavLink>
  );
};

const Navbar = ({ links }) => {
  return (
    <div>
      <nav className=" navbar-expand-lg navbar-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {links.map((link) => {
              return <NavBarItem key={link.id} link={link} />;
            })}
            {/* <navLink to="" className="nav-item active">
                                <Link className="nav-link" href="#">Home <span className="sr-only"></span></Link>
                            </navLink>
                            <navLink className="nav-item">
                                <Link className="nav-link" href="#">Link</Link>
                            </navLink> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
