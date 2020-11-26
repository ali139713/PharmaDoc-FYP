import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SideBarPharmacy from '../AliComponents/sidebarpharmacymanager';
import GetMedicines from './GetMedicines';
import AddMedicine from './AddMedicine';
import UpdateMedicine from './UpdateMedicine';


class PharmacyManagerDashboard extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/pharmacymanager' render={(props) => {
                        return (
                            <SideBarPharmacy {...props} />
                        )
                    }} />
                    <Route exact path='/pharmacymanager/medicines' render={(props) => {
                        return (
                            <GetMedicines {...props} />
                        )
                    }} />
                    <Route exact path='/pharmacymanager/addMedicine' render={(props) => {
                        return (
                            <AddMedicine {...props} />
                        )
                    }} />
                    <Route exact path='/pharmacymanager/medicines/updateMedicine/:id' render={(props) => {

                        return (
                            <UpdateMedicine {...props} />
                        )
                    }} />
                </Switch>
            </div>
        );
    }
}

export default PharmacyManagerDashboard;