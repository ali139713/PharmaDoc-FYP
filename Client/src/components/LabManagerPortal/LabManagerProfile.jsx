import React, { Component } from 'react';
import Navbar from '../AliComponents/navbar';
import "../../style.scss";
import '../AliComponents/form.scss';
import routeLinksLabManager from '../AliComponents/routeLinksLabManager';

class LabManagerProfile extends Component {

    state = {
        Password: "",
        Username: "",
     
    };



    handleChange = (event) => {
        this.setState({
               [event.target.name]: event.target.value

             },
         )  
    }


    // fileSelectedHandler = event => {
    //     this.setState({
    //   ProfileImage: event.target.files[0]
    //      })
    // }




    render() {
        return (
            <div>
                <div id="maindiv" className="container-fluid">
                    <Navbar links={routeLinksLabManager} />
                    <div className="separation" >

                    </div>

                    <div className="content">
                        <div className="heading">
                            <hr />
                            <h2> WELCOME TO YOUR PROFILE </h2>
                            <hr />
                        </div>
                        <div className="form-holder">
                            <div className="form">
                                <form>
                                    <div className="form-row">

                                        <div className="form-group col-md-10">
                                        <label htmlFor="inputAddress">Username</label>
                                        <input name="Username" type="text" className="form-control" id="inputAddress" placeholder="Username" onChange={this.handleChange}/>
                                         
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputPassword4">Password</label>
                                            <input name="Password" type="password" className="form-control" id="inputPassword4" placeholder="Password" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                 
                                 

                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>

                            </div>
                        </div>

                    </div>


                </div>
            </div>
        );
    }
}

export default LabManagerProfile;