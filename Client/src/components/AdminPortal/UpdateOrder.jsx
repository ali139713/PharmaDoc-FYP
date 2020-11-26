import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.scss';

class UpdateOrder extends Component {


    state = {
        OrderStatus: "",
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

        this.props.history.push('/admin/orders');
    }

    fileUploadHandler = (event) => {
        event.preventDefault();
        toast("Updated Successfully!", {
            position: toast.POSITION.TOP_CENTER,

        });
        const obj = {

            orderStatus: this.state.OrderStatus,
           
        }
        Axios.patch('http://localhost:5000/order/update/' + this.props.match.params.id, obj
        )

            .then(res => {
                console.log(res);
                this.setState({ OrderStatus: "" });

            })
            .catch(err => {
                console.log(err);


            })
    }
    validate = () => {
        if (this.state.OrderStatus) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {


        return (
            <div className="form-style-8">
                <h2>Update Order Status</h2>

                <form
                    onSubmit={this.fileUploadHandler} >
                    <div >

                        <input

                            type="text"
                            id="OrderStatus"
                            placeholder="Update Order Status"
                            name="OrderStatus"
                            value={this.state.OrderStatus}
                            onChange={this.handleChange}
                        />
                    </div>
                    <ToastContainer />



                </form>
                <div className="buttonHolder">
                    <div className="button1">
                        <button onClick={this.routeHandler}>Back</button>
                    </div>
                    <div className="button2">
                        <span class="" tabindex="0" data-toggle="tooltip" title="All fields are required">
                            <button disabled={this.validate()} onClick={this.fileUploadHandler}>Upload</button>
                        </span>
                    </div>

                </div>
            </div>

        );

    }
}

export default UpdateOrder;
