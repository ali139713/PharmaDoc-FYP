import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SidebarLabManager from "../AliComponents/sidebarLabManager";
import LabTestOrders from "./LabTestOrders";
import AddLabTest from "./AddLabTest";
import GetLabTest from "./GetLabTest";

class LabManagerDashboard extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/labmanager"
            render={(props) => {
              return <SidebarLabManager {...props} />;
            }}
          />
          <Route
            exact
            path="/labManager/labtestorders/:labManagerID"
            render={(props) => {
              return <LabTestOrders {...props} />;
            }}
          />
          <Route
            exact
            path="/labManager/addLabTest/:labManagerID"
            render={(props) => {
              return <AddLabTest {...props} />;
            }}
          />
          <Route
            exact
            path="/labManager/labtest/:labManagerID"
            render={(props) => {
              return <GetLabTest {...props} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default LabManagerDashboard;
