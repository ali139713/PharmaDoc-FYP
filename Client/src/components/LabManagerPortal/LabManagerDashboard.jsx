import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LabManagerProfile from './LabManagerProfile';;
import LabTestOrders from './LabTestOrders';;



class LabManagerDashboard extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/labmanagerprofile' render={(props) => {
                        return (
                            <LabManagerProfile {...props} />
                        )
                    }} />
                    <Route exact path='/labtestorders' render={(props) => {
                        return (
                            <LabTestOrders {...props} />
                        )
                    }} />
                   
                </Switch>
            </div>
        );
    }
}

export default LabManagerDashboard;