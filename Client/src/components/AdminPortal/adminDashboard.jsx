import React from "react";
import "./adminDashboard.scss";
// import GetMedicines from './getMedicines';
import GetPharmacies from "./getPharmacy";
// import UpdateMedicine from './updateMedicine';
import UpdatePharmacy from "./updatePharmacy";
import UpdateLab from "./updateLab";
import UpdateLabTest from "./updateLabTest";
import UpdateOrder from "./UpdateOrder";
import UpdateDoctors from "./UpdateDoctors";
import Getlabs from "./getLabs";
import GetLabTests from "./getLabTests";
import GetOrders from "./GetOrders";
import GetDoctors from "./GetDoctors";
import SideBar from "../AliComponents/sidebar";
import AddPharmacy from "./addPharmacy";
import AddLab from "./addLab";
import AddLabTest from "./addLabTest";
import GetPharmacyManager from "./GetPharmacyManager";
import UpdatePharmacyManager from "./UpdatePharmacyManagers";
import GetLabManager from "./GetLabManager";

import { Switch, Route } from "react-router-dom";

const adminDashboard = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/admin"
          render={(props) => {
            return <SideBar {...props} />;
          }}
        />

        <Route
          exact
          path="/admin/pharmacy"
          render={(props) => {
            return <GetPharmacies {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/labs"
          render={(props) => {
            return <Getlabs {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/labtests"
          render={(props) => {
            return <GetLabTests {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/orders"
          render={(props) => {
            return <GetOrders {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/doctors"
          render={(props) => {
            return <GetDoctors {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/pharmacyManagers"
          render={(props) => {
            return <GetPharmacyManager {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/labManagers"
          render={(props) => {
            return <GetLabManager {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/pharmacy/updatePharmacy/:id"
          render={(props) => {
            return <UpdatePharmacy {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/labs/updateLabs/:id"
          render={(props) => {
            return <UpdateLab {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/labtests/updateLabTests/:id"
          render={(props) => {
            return <UpdateLabTest {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/orders/updateOrders/:id"
          render={(props) => {
            return <UpdateOrder {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/doctors/updateDoctors/:id"
          render={(props) => {
            return <UpdateDoctors {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/pharmacyManagers/updatepharmacyManager/:id"
          render={(props) => {
            return <UpdatePharmacyManager {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/addPharmacy"
          render={(props) => {
            return <AddPharmacy {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/addLab"
          render={(props) => {
            return <AddLab {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/addLabTest"
          render={(props) => {
            return <AddLabTest {...props} />;
          }}
        />
      </Switch>
    </div>
  );
};

export default adminDashboard;
