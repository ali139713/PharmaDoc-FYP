import React, { useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import SideBarPharmacy from "../AliComponents/sidebarpharmacymanager";
import GetMedicines from "./GetMedicines";
import AddMedicine from "./AddMedicine";
import UpdateMedicine from "./UpdateMedicine";
import GetOrders from "./GetOrders";
import UpdateOrders from "./UpdateOrder";

const PharmacyManagerDashboard = (props) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/pharmacymanager"
          render={(props) => {
            return <SideBarPharmacy {...props} />;
          }}
        />
        <Route
          exact
          path="/pharmacymanager/medicines/:pharmacistID"
          render={(props) => {
            return <GetMedicines {...props} />;
          }}
        />
        <Route
          exact
          path="/pharmacymanager/addMedicine/:pharmacistID"
          render={(props) => {
            return <AddMedicine {...props} />;
          }}
        />
        <Route
          exact
          path="/pharmacymanager/medicines/updateMedicine/:id/:pharmacistID"
          render={(props) => {
            return <UpdateMedicine {...props} />;
          }}
        />
        <Route
          exact
          path="/pharmacymanager/orders/:pharmacistID"
          render={(props) => {
            return <GetOrders {...props} />;
          }}
        />
        <Route
          exact
          path="/pharmacymanager/orders/updateOrders/:id"
          render={(props) => {
            return <UpdateOrders {...props} />;
          }}
        />
      </Switch>
    </div>
  );
};

export default PharmacyManagerDashboard;
