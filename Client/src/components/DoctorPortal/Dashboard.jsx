import React, { Component } from 'react';
import DoctorProfile from './Doctorprofile';
import DoctorOrder from './Doctororders';
import DoctorAppointment from './Doctorappointments';
import { Switch,Route} from "react-router-dom";


class Dashboard extends Component {
  render() {
    return (
       
         <Switch>
         { <Route exact path='/profile' render={()=> {
            return (
            <DoctorProfile />
            )
          }} />}
    
          <Route exact path='/doctorappointments' render={()=>{
            return (
              <DoctorAppointment />
            )
          }} />
          <Route exact path='/doctororders' render={()=>{
            return (
              <DoctorOrder />
            )
          }} />
          
          </Switch>        
              
               
            
      
    );
  }
}

export default Dashboard;