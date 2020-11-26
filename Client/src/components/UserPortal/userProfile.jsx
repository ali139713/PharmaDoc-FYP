import React, { Component } from 'react';
import Navbar from '../AliComponents/navbar';
import "../../style.scss";
import '../AliComponents/form.scss';
import routeLinksUser from '../AliComponents/routeLinksUser';

class Userprofile extends Component {

    state = {
        Password: "",
        Username: "",
        PhoneNo: "",
        City: "",
        ProfileImage: "",
    };



    handleChange = (event) => {
        this.setState({
               [event.target.name]: event.target.value

             },
         )  
    }


    fileSelectedHandler = event => {
        this.setState({
      ProfileImage: event.target.files[0]
         })
    }




    render() {
        return (
            <div>
                <div id="maindiv" className="container-fluid">
                    <Navbar links={routeLinksUser} />
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
                                            <label htmlFor="inputPassword4">Password</label>
                                            <input name="Password" type="password" className="form-control" id="inputPassword4" placeholder="Password" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress">Username</label>
                                        <input name="Username" type="text" className="form-control" id="inputAddress" placeholder="Username" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress2">PhoneNo</label>
                                        <input name="PhoneNo" type="number" className="form-control" id="inputAddress2" placeholder="PhoneNo" max="11" pattern="[0-9]{11}" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-row">
                                        
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCity">City</label>
                                            <input name="City" type="text" id="inputCity" className="form-control" placeholder="City" onChange={this.handleChange} />

                                        </div>
                                    
                                    
                                        <div className="form-group col-md-6">
                                           
                                            <input name="ProfileImage" type="file" className="form-control" id="profileimage" placeholder="Profile picture" name="profileimage" style={{display:""}} onChange={this.fileSelectedHandler}/>
                                            
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

export default Userprofile;