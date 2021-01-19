import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import LoginDialog from "./components/LoginDialog";
import AdminLogin from "./components/AdminPortal/AdminLogin";
import SignUp from "./components/SignUp/SignUp";
import MedicineCartMain from "./components/MedicinesCart/MedicineCartMain";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DoctorCategory from "./components/DoctorSelectionSec/App";
import DoctorProfileCard from "./components/DoctorAppoitnmentDisplay/DoctorProfileCard";
import ViewDoctorProfile from "./components/DoctorAppoitnmentDisplay/ViewDoctorProfile/DoctorProfile";
import BookAppointment from "./components/DoctorAppoitnmentDisplay/BookAppointment/BookAppointment";
import NewPassword from "./components/SetNewPassword/NewPassword";
import LabDashboard from "./components/LabPortal/Labdashboard";
import LabTestOrder from "./components/LabManagerPortal/LabTestOrders";
import DoctorPortal from "./components/DoctorPortal/Doctorappointments";
import DoctorProfile from "./components/DoctorPortal/DoctorprofileSec";
import DoctorChangePassword from "./components/DoctorPortal/ChangePassword";
import UserChangePassword from "./components/UserPortal/userChangePassword";
import UserAppointments from "./components/UserPortal/userAppointments";
import UserProfile from "./components/UserPortal/UserProfileSec";
import UserOrders from "./components/UserPortal/userOrders";
import UserReport from "./components/UserPortal//UserReport";
import userPrescriptions from "./components/UserPortal/userPrescriptions";
import userDiagnosis from "./components/UserPortal/userDiagnosis";
import AdminDashboard from "./components/AdminPortal/adminDashboard";
import Pharmacies from "./components/AdminPortal/getPharmacy";
import Labs from "./components/AdminPortal/getLabs";
import Doctors from "./components/AdminPortal/GetDoctors";
import PharmacyManagers from "./components/AdminPortal/GetPharmacyManager";
import LabManagers from "./components/AdminPortal/GetLabManager";
import updatePharmacy from "./components/AdminPortal/updatePharmacy";
import UpdateLabs from "./components/AdminPortal/updateLab";
import UpdateDoctors from "./components/AdminPortal/UpdateDoctors";
import UpdatePharmacyManager from "./components/AdminPortal/UpdatePharmacyManagers";
import PharmacyManagerDashboard from "./components/pharmacyManagerPortal/pharmacyManagerDashboard";
import UpdateLabManager from "./components/AdminPortal/UpdateLabManager";
import LabManagerDashboard from "./components/LabManagerPortal/LabManagerDashboard";
import LabTestOrders from "./components/LabManagerPortal/LabTestOrders";
import GetLabTest from "./components/LabManagerPortal/GetLabTest";
import UpdateLabTest from "./components/AdminPortal/updateLabTest";
import PlaceOrder from "./components/MedicinesCart/Placeorder";
import Payment from "./components/MedicinesCart/Payment";
import TestPayment from "./components/LabPortal/Testpayment";
import ChoosePharmacy from "./components/MedicinesCart/ChoosePharmacy";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import AddPrescription from "./components/DoctorPortal/AddPrescription/AddPrescription";
import AddPrescriptionNew from "./components/DoctorPortal/AddPrescription/AddPrescriptionNew";
import AddDiagosis from "./components/DoctorPortal/AddDiagnosis/AddDiagosis";
import RateDoctor from "./components/UserPortal/RateDoctor";
import Room from "./components/AliComponents/Room";
import CreateRoom from "./components/AliComponents/CreateRoom";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" exact component={Home} />

        {/* <UnPrivateRoute
          path="/labmanagerprofile"
          component={LabManagerProfile}
        /> */}
        {/* <UnPrivateRoute
          path="/pharmacymanager"
          component={PharmacyManagerDashboard}
        /> */}

        <PrivateRoute
          path={"/pharmacymanager"}
          roles={["Pharmacy Manager"]}
          component={PharmacyManagerDashboard}
        />
        <PrivateRoute
          path={"/labmanager"}
          roles={["Lab Manager"]}
          component={LabManagerDashboard}
        />

        <PrivateRoute
          exact
          path={"/labtestorders/:labManagerID"}
          roles={["Lab Manager"]}
          component={LabTestOrder}
        />
        <PrivateRoute
          exact
          path={"/labManager/labtest/:labManagerID"}
          roles={["Lab Manager"]}
          component={GetLabTest}
        />
        <PrivateRoute
          exact
          path={"/labtests/updateLabTests/:id"}
          roles={["Lab Manager"]}
          component={UpdateLabTest}
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
        <UnPrivateRoute path="/adminLogin" component={AdminLogin} />
        {/* <UnPrivateRoute path="/admin" component={AdminDashboard} /> */}
        <UnPrivateRoute path="/sign-up" component={SignUp} />
        <PrivateRoute
          exact
          path="/admin"
          roles={["Admin"]}
          component={AdminDashboard}
        />
        <PrivateRoute
          exact
          path="/admin/pharmacy"
          roles={["Admin"]}
          component={Pharmacies}
        />
        <PrivateRoute
          exact
          path="/admin/pharmacy/updatePharmacy/:id"
          roles={["Admin"]}
          component={updatePharmacy}
        />
        <PrivateRoute
          exact
          path="/admin/labs"
          roles={["Admin"]}
          component={Labs}
        />
        <PrivateRoute
          exact
          path="/admin/labs/updateLabs/:id"
          roles={["Admin"]}
          component={UpdateLabs}
        />

        <PrivateRoute
          exact
          path="/admin/doctors"
          roles={["Admin"]}
          component={Doctors}
        />
        <PrivateRoute
          exact
          path="/admin/doctors/updateDoctors/:id"
          roles={["Admin"]}
          component={UpdateDoctors}
        />

        <PrivateRoute
          exact
          path="/admin/pharmacyManagers"
          roles={["Admin"]}
          component={PharmacyManagers}
        />
        <PrivateRoute
          exact
          path="/admin/pharmacyManagers/updatepharmacyManager/:id"
          roles={["Admin"]}
          component={UpdatePharmacyManager}
        />
        <PrivateRoute
          exact
          path="/admin/labManagers"
          roles={["Admin"]}
          component={LabManagers}
        />
        <PrivateRoute
          exact
          path="/admin/labManagers/updateLabManager/:id"
          roles={["Admin"]}
          component={UpdateLabManager}
        />
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
          path={"/ratedoctor"}
          roles={["Patient"]}
          component={RateDoctor}
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
          exact
          path={"/doctorappointments/addDiagosis/:userID/:doctorID"}
          roles={["Doctor"]}
          component={AddDiagosis}
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
          path={"/userreport"}
          roles={["Patient"]}
          component={UserReport}
        />
        <PrivateRoute
          path={"/userPrescriptions"}
          roles={["Patient"]}
          component={userPrescriptions}
        />
        <PrivateRoute
          path={"/userDiagnosis"}
          roles={["Patient"]}
          component={userDiagnosis}
        />
        <PrivateRoute
          exact
          path={"/room"}
          roles={["Patient", "Doctor"]}
          component={CreateRoom}
        />
        <PrivateRoute
          exact
          path={"/room/:roomID"}
          roles={["Patient", "Doctor"]}
          component={Room}
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
          exact
          path="/userchangePassword"
          roles={["Patient"]}
          component={UserChangePassword}
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
        <Route
          exact
          path="/doctors-category/doctors-cards/:name"
          component={DoctorProfileCard}
        />
        {/* <Route exact path="/doctors-cards" component={DoctorProfileCard} /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
