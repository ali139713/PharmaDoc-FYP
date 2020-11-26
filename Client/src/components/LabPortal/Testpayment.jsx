import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import AuthService from "../../Services/AuthServices";
import Axios from 'axios';
class Testpayment extends Component {
    state = {

        labtestData: "",
        userID:"",
        userEmail:"",
        isLoaded: false,
        isVisible: false,

    }
    componentDidMount() {
        let response = "";
        const { match: { params } } = this.props;
       const labtest = JSON.parse(localStorage.getItem("labtest")) || [];
        AuthService.isAuthenticated().then((data) => {
            response = (data.user);
        this.setState({
            userID:response._id,
            userEmail:response.email,
            labtestData: labtest,
            isLoaded: true
        })
    });
    }
handleBack=()=>{
    this.props.history.push('/accreditedlabs');
}

handletestPayment= async () =>{
    const obj = {
            userID: this.state.userID,
            userEmail:this.state.userEmail,
            name:this.state.labtestData[0].name,
            price:this.state.labtestData[0].price,
            lab:this.state.labtestData[0].lab,
            description:this.state.labtestData[0].description,
    };
    Axios.post("http://localhost:5000/labtestorder/post", obj).then(res => {
        console.log(res);
        alert("Labtest Appointment confirmed");
        this.props.history.push("/accreditedlabs");
    })
        .catch(error => {
            console.log(error);
        })
}

    handleToken =  (token, amount) => {
        // console.log({token,addresses});
        const price = this.state.labtestData[0].price;
        console.log(price);
        const data = { token, amount };
         Axios.post("http://localhost:5000/stripe/checkout", data).then(res => {
            console.log(res);
            this.setState({ isVisible: true });
           localStorage.removeItem("labtest");
        })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (!this.state.isLoaded)
            return <div className="container"><i className="fas fa-spinner fa-spin" style={{ transition: "animate 0.5ms infinite" }}></i>Loading...</div>
        else
            
        console.log(this.state.labtestData[0].price);
        console.log(this.state.labtestData[0].name);
        return (
            <div className="testPayment-container">
                <div className="container-fluid">
                    <div className="testPayment">

                        <h3 style={{ color: "black", textEmphasisStyle: "filled", fontFamily: "oswald" }}>    Credit card payment... </h3>
                        <hr />
                        <div className="stripe-container" style={{ marginTop: "4%", marginBottom: "4%" }}>
                            {  this.state.isVisible === false &&
                                <StripeCheckout
                                    stripeKey="pk_test_51HpMDYEyGT5AepueyrXSCPC5McobAwl2OjQRG28woWNiuhrFqPw3wpnlZlc5UjusRNaXPfr7OyOCgttJv40w4Bum00PT0Z5cAe"
                                    token={this.handleToken}
                                    amount={this.state.labtestData[0].price}
                                    name={this.state.labtestData[0].name}
                                    description={`Total amount: ${this.state.labtestData[0].price}`}


                                />
                                
                            }
                            
                        </div>
                        <button style ={{width:"10%"}}onClick={this.handleBack}><i style={{ fontSize: "1rem", marginRight:"2%"}} className="fas fa-arrow-left"></i>Back</button>
                        {this.state.isVisible === true &&
                            <button style ={{width:"10%"}} onClick={this.handletestPayment}> confirm...</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Testpayment;