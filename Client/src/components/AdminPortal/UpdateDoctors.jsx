import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.scss';

class UpdateDoctors extends Component {


    state = {
        Status: "",
    };


    handleChange = (event) => {


        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({

            [event.target.name]: event.target.value

        },


        )
    }
    routeHandler = () => {

        this.props.history.push('/admin/doctors');
    }

    fileUploadHandler = (event) => {
        event.preventDefault();
        toast("Updated Successfully!", {
            position: toast.POSITION.TOP_CENTER,

        });
        const obj = {

            status: this.state.Status,
           
        }
        Axios.patch('/user/update/doctorProfile/' + this.props.match.params.id, obj
        )

            .then(res => {
                console.log(res);
                this.setState({ status: "" });

            })
            .catch(err => {
                console.log(err);


            })
    }
    validate = () => {
        if (this.state.Status) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {


        return (
            <div className="form-style-8">
                <h2>Update Status</h2>

                <form
                    onSubmit={this.fileUploadHandler} >
                    <div >
                    <span> Update Status </span>
                        <select
                            className="scrollable-menu"
                            id="Status"
                            name="Status"
                            value={this.state.Status}
                            onChange={this.handleChange}
                        >
                            <option value="" disabled>Please Choose a status...</option>
                            <option value="Approved">Approved</option>
                            <option value="Not Approved">Not Approved</option>

                        </select>


                    </div>
                    <ToastContainer />



                </form>
                <div className="buttonHolder">
                    <div className="button1">
                        <button onClick={this.routeHandler}>Back</button>
                    </div>
                    <div className="button2">
                        <span class="" tabindex="0" data-toggle="tooltip" title="All fields are required">
                            <button disabled={this.validate()} onClick={this.fileUploadHandler}>Update</button>
                        </span>
                    </div>

                </div>
            </div>

        );

    }
}

export default UpdateDoctors;
