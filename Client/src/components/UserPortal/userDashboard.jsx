import React, { Component } from "react";
import UserProfile from "./userProfile";
import UserOrder from "./userOrders";
import UserAppointment from "./userAppointments";
import { Switch, Route } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/profile"
          render={() => {
            return <UserProfile />;
          }}
        />
        <Route
          exact
          path="/userappointments"
          render={() => <UserAppointment />}
        />
        <Route exact path="/userorders" render={() => <UserOrder />} />
      </Switch>
    );
  }
}

export default Dashboard;
