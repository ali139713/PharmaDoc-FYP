import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import LoginDialog from "./components/LoginDialog";
import SignUp from "./components/SignUp/SignUp";
import MedicineCartMain from "./components/MedicinesCart/MedicineCartMain";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DoctorCategory from "./components/DoctorSelectionSec/App";
import DoctorProfileCard from "./components/DoctorAppoitnmentDisplay/DoctorProfileCard";
import ViewDoctorProfile from "./components/DoctorAppoitnmentDisplay/ViewDoctorProfile/DoctorProfile";
import BookAppointment from "./components/DoctorAppoitnmentDisplay/BookAppointment/BookAppointment";
import NewPassword from "./components/SetNewPassword/NewPassword";
import LabDashboard from "./components/LabPortal/Labdashboard";
import DoctorPortal from "./components/DoctorPortal/Doctorappointments";
import DoctorProfile from "./components/DoctorPortal/Doctorprofile";
import DoctorChangePassword from "./components/DoctorPortal/ChangePassword";
import UserAppointments from "./components/UserPortal/userAppointments";
import UserProfile from "./components/UserPortal/userProfile";
import UserOrders from "./components/UserPortal/userOrders";
import userPrescriptions from "./components/UserPortal/userPrescriptions";
import AdminDashboard from "./components/AdminPortal/adminDashboard";
import PharmacyManagerDashboard from "./components/pharmacyManagerPortal/pharmacyManagerDashboard";
import LabManagerProfile from "./components/LabManagerPortal/LabManagerProfile";
import LabTestOrders from "./components/LabManagerPortal/LabTestOrders";
import PlaceOrder from "./components/MedicinesCart/Placeorder";
import Payment from "./components/MedicinesCart/Payment";
import TestPayment from "./components/LabPortal/Testpayment";
import ChoosePharmacy from "./components/MedicinesCart/ChoosePharmacy";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import AddPrescription from "./components/DoctorPortal/AddPrescription/AddPrescription";
import AddPrescriptionNew from "./components/DoctorPortal/AddPrescription/AddPrescriptionNew";
function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" exact component={Home} />

        <UnPrivateRoute
          path="/labmanagerprofile"
          component={LabManagerProfile}
        />
        <UnPrivateRoute
          path="/pharmacymanager"
          component={PharmacyManagerDashboard}
        />

        <Route exact path="/medicines" component={ChoosePharmacy} />
        <Route
          exact
          path="/medicines/:name"
          render={(props) => {
            return <MedicineCartMain {...props} />;
          }}
        />
        <Route path="/accreditedlabs" component={LabDashboard} />
        <UnPrivateRoute path="/labtestorders" component={LabTestOrders} />
        <UnPrivateRoute path="/sign-in" component={LoginDialog} />
        <UnPrivateRoute path="/admin" component={AdminDashboard} />
        <UnPrivateRoute path="/sign-up" component={SignUp} />
        <PrivateRoute
          exact
          path="/doctorappointments"
          roles={["Doctor"]}
          component={DoctorPortal}
        />
        <Route
          exact
          path="/doctors-cards/doctor-profile/:id"
          component={ViewDoctorProfile}
        />
        <PrivateRoute
          path={"/doctors-cards/book-appointment/:id"}
          roles={["Patient"]}
          component={BookAppointment}
        />
        <PrivateRoute
          path={"/placeorder"}
          roles={["Patient"]}
          component={PlaceOrder}
        />

        <PrivateRoute
          path={"/payment"}
          roles={["Patient"]}
          component={Payment}
        />
        <PrivateRoute
          exact
          path={"/doctorappointments/addPrescription/:userID/:doctorID"}
          roles={["Doctor"]}
          component={AddPrescriptionNew}
        />
        <PrivateRoute
          path={"/profile"}
          roles={["Patient"]}
          component={UserProfile}
        />
        <PrivateRoute
          path={"/userorders"}
          roles={["Patient"]}
          component={UserOrders}
        />
        <PrivateRoute
          path={"/userPrescriptions"}
          roles={["Patient"]}
          component={userPrescriptions}
        />
        <PrivateRoute
          exact
          path={"/testpayment"}
          roles={["Patient"]}
          component={TestPayment}
        />
        <PrivateRoute
          exact
          path="/doctor-profile"
          roles={["Doctor"]}
          component={DoctorProfile}
        />
        <PrivateRoute
          exact
          path="/changePassword"
          roles={["Doctor"]}
          component={DoctorChangePassword}
        />

        <PrivateRoute
          path="/userappointments"
          roles={["Patient"]}
          component={UserAppointments}
        />
        <Route path="/reset/:token" component={NewPassword} />

        <PrivateRoute
          exact
          path="/profile"
          roles={["Doctor"]}
          component={DoctorPortal}
        />
        <Route path="/medicines" component={MedicineCartMain} />
        <Route exact path="/doctors-category" component={DoctorCategory} />
        <Route exact path="/doctors-cards" component={DoctorProfileCard} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
