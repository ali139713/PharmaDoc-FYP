import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';


class Placeorder extends Component {



    state = {
        Name: "",
        Address: "",
        City: "",
        postalCode: "",
        orderItems: [],
        totalItems: "",
        totalAmount: "",
        prescriptionImage: "",
        isRequired: false,
        isLoaded: false,

    };


    componentDidMount() {

        this.setState({
            orderItems:JSON.parse(localStorage.getItem("cartItem")) || [],
            totalItems:JSON.parse(localStorage.getItem("totalItems")) || [],
            totalAmount:JSON.parse(localStorage.getItem("totalAmount")) || [],
            isLoaded: true
        });

                this.handleFilter();
       
    }
 
    
handleFilter = (props) =>{
    const orderitems = JSON.parse(localStorage.getItem("cartItem")) || [] ;
    console.log(orderitems);
    for (const c of orderitems) {
        if (c.prescription === "Required") {
            this.setState({ isRequired: true });
            console.log(c.prescription);
        }
      else{
          console.log("IN ELSE")
      }

    }
}
    handleChange = (event) => {


        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({

            [event.target.name]: event.target.value

        },


        )
    }

    fileSelectedHandler =  async (event) => {
       const file = event.target.files[0];
       const fd = new FormData();
       fd.append('prescriptionimage', file, file.name);
       const response = await Axios.post('http://localhost:5000/medicine/prescriptionimage',fd);
      this.setState({prescriptionImage:response.data});
    }


    validate = () => {
        if(this.state.isRequired === true && this.state.Name && this.state.Address && this.state.City && this.state.postalCode && this.state.prescriptionImage){
      return false;
    }
        else if(this.state.isRequired === false && this.state.Name && this.state.Address && this.state.City && this.state.postalCode){
            return false;
        }
        else{
            return true;
        }
    }

    routeHandler = () => {

        this.props.history.push('/medicines');
    }


    fileUploadHandler = (event) => {
        event.preventDefault();



    }

    handleData = () =>{
        const obj = {
            name:this.state.Name,
            address:this.state.Address,
            city:this.state.City,
            postalCode:this.state.postalCode,
            prescriptionImage:this.state.prescriptionImage
        }
        localStorage.setItem("Info", JSON.stringify(obj));
    }
    render() {
        if(this.state.isLoaded === false){
          
            
            return <div>Loading...</div>
           
        }
     
        else{
            console.log(this.state.isLoaded);
            console.log(this.state.isRequired);
            console.log(this.state.orderItems);
            console.log(this.state.totalItems);
            console.log(this.state.totalAmount);
        return (
            <div className="placeorder-holder" >
                <div className="placeorder-form-container">
                    <div className="placeorder-form">

                        <h2>Your Info...</h2>


                        <form onSubmit={this.fileUploadHandler} >

                            <div >

                                <input

                                    type="text"
                                    id="Name"
                                    placeholder="Enter Name"
                                    name="Name"
                                    onChange={this.handleChange}
                                    value={this.state.Name}
                                />
                            </div>



                            <div>

                                <input
                                    type="text"
                                    id="Address"
                                    placeholder="Enter Address"
                                    name="Address"
                                    onChange={this.handleChange}
                                    value={this.state.Address}
                                />
                            </div>
                            <div >

                                <input
                                    type="text"
                                    id="City"
                                    placeholder="Enter City"
                                    name="City"
                                    value={this.state.City}
                                    onChange={this.handleChange}
                                />
                            </div>
                            { this.state.isRequired &&
                                <div>
                                    <label style={{color:"gray"}}>
                                        Upload Prescription
                                        <input style={{ size: "10%" }}
                                            type="file"
                                            id="prescriptionImage"
                                            placeholder=""
                                            name="prescriptionImage"
                                            onChange={this.fileSelectedHandler}
                                        />
                                    </label>
                                </div>
                            }
                            <div>

                                <input
                                    type="number"
                                    id="postalCode"
                                    placeholder="Enter Postal code"
                                    name="postalCode"
                                    onChange={this.handleChange}
                                    value={this.state.postalCode}
                                />
                            </div>
                            <div>


                            </div>
                        </form>
                        <div className="placeorder-form-buttonholder">
                            <button className="placeorder-form-button1" onClick={this.routeHandler}>Back to Shopping...</button>
                        </div>
                    </div>
                </div>
                <div className="placeorder-orderinfo-container">
                    <h2> Your order...</h2>
                    <div className="placeorder-orderinfo">
                        <div className="container-fluid">

                            {this.state.orderItems.map((obj, i) => (

                                <div className="col md-2" key={i}>


                                    <h4 ><strong>Item:</strong> <span style={{ fontFamily: "poppins", fontWeight: "lighter" }}>{obj.name}</span> </h4>

                                    <h4> <strong>Quantity:</strong><span style={{ fontFamily: "poppins", fontWeight: "lighter" }}>{obj.quantity}</span></h4>

                                    <img style={{ height: "170px" }} src={obj.productImage} />
                                    <br />



                                </div>



                            ))}
                            <hr />
                            <h3> Total Items:{this.state.totalItems}</h3>
                            <h3> Total Amount:{this.state.totalAmount}</h3>

                            <hr />
                        </div>
                        <Link to= "/payment" onClick={this.handleData}>
                        <span class="" tabindex="0" data-toggle="tooltip" title="Please fill required information">
                            <button disabled={this.validate()} className="placeorder-orderinfo-button" >Checkout...</button>
                            </span>
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
}
}

export default Placeorder;