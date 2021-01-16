import React from "react";
import "../../style.scss";
import routeLinks from "../AliComponents/routeLinks";
// import GridExample from "../AliComponents/grid";
import Tab from "../AliComponents/tabs";
import Navbar from "../AliComponents/navbar";

const Doctororders = () => {
  return (
    // <Router>
    <div id="maindiv" className="container-fluid">
      <Navbar links={routeLinks} />
      <div className="separation"></div>
      <div className="content">
        <div className="heading">
          <hr />
          <h2> My Orders... </h2>
          <hr />
        </div>
      </div>
      <Tab name="Active" secondName="Completed" />

      {/* <GridExample /> */}
    </div>
    // </Router>
  );
};

export default Doctororders;
