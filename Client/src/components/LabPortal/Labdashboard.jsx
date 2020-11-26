import React from 'react';
import AccreditedLab from './Accreditedlabs';
import TestInfo from './Testinfo'; 
import TestPayment from './Testpayment';
import { Switch,Route} from "react-router-dom";


const Labdashboard = () => {



    return (
      <div className = "labdashboard">
        <Switch>
 <Route exact path='/accreditedlabs' render={(props)=> {
            return (
              <AccreditedLab {...props}/>
            )
          }} />
           <Route exact path='/accreditedlabs/:description' render={(props)=> {
             
            return (
              <TestInfo {...props}/>
            )
          }} />
            <Route exact path='/testpayment' render={(props)=> {
             
             return (
               <TestPayment {...props}/>
             )
           }} />
      </Switch>
      </div>

    );
};

export default Labdashboard;