import React, { Component } from "react";
import AuthService from "../../Services/AuthServices";
// import StripeCheckout from 'react-stripe-checkout';
import Model from "../AliComponents/Model";
import Axios from "axios";

class Payment extends Component {
  state = {
    isOpen: false,
    customerID: "",
    customerName: "",
    customerEmail: "",
    Address: "",
    City: "",
    postalCode: "",
    orderItems: [],
    orderItems2: [],
    totalAmount: null,
    prescriptionImage: "",
    orderNo: null,
    allProducts: [],
    isLoaded: false,
  };

  async componentDidMount() {
    let response = "";
    window.scrollTo(0, 0);
    const info = JSON.parse(localStorage.getItem("Info")) || [];
    const orderItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    const totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || [];
    console.log(totalAmount);
    AuthService.isAuthenticated().then((data) => {
      response = data.user;
      this.setState({
        customerID: response._id,
        customerEmail: response.email,
        customerName: info.name,
        Address: info.address,
        City: info.city,
        postalCode: info.postalCode,
        orderItems: orderItems,
        totalAmount: totalAmount,
        prescriptionImage: info.prescriptionImage,
      });
    });
    try {
      const response1 = await Axios.get("http://localhost:5000/medicine/get");
      const response = await Axios.get("http://localhost:5000/order/get");
      this.setState({
        allProducts: response1.data.medicines,
        orderNo: response.data.count + 1,
        isLoaded: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  handleDeliveryClick = async (event) => {
    let Error = false;
    const buttonName = event.target.innerText;
    const orderItems = this.state.orderItems;
    const allProducts = this.state.allProducts;
    console.log("allProducts", allProducts);
    for (const c of orderItems) {
      let filtered = allProducts.filter((t) => t._id === c.id);
      console.log("filtered", filtered);
      if (filtered[0].quantity >= c.quantity) {
        console.log("woohooo!!!!");
        this.state.orderItems2.push(c);
      } else {
        console.log("Failed");
        Error = true;
        console.log(this.state.isError);
        if (c.quantity === 0) {
          c.error = "Not available";
        } else {
          c.error = `only ${filtered[0].quantity} available`;
          console.log("only 2 alloweed");
        }
        this.state.orderItems2.push(c);
        this.props.history.push("/medicines");
      }
    }
    localStorage.setItem("cartItem", JSON.stringify(this.state.orderItems2));
    console.log(this.state.orderItems2);
    console.log(Error);

    if (Error === false) {
      for (const c of orderItems) {
        let filtered = allProducts.filter((t) => t._id === c.id);
        if (filtered[0].quantity >= c.quantity) {
          console.log("woohooo!!!!");
          filtered[0].quantity = filtered[0].quantity - c.quantity;
          console.log("filtered", filtered[0]);
          console.log("filtered", filtered[0]._id);
          console.log("filtered", filtered[0].quantity);
          console.log("filtered", filtered);

          try {
            const r = await Axios.patch(
              "http://localhost:5000/medicine/update/order/" + filtered[0]._id,
              filtered[0]
            );
            console.log("api worked");
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Failed");
        }
      }

      if (this.state.prescriptionImage) {
        const obj = {
          customerID: this.state.customerID,
          customerName: this.state.customerName,
          customerEmail: this.state.customerEmail,
          address: this.state.Address,
          city: this.state.City,
          postalCode: this.state.postalCode,
          orderItems: this.state.orderItems,
          totalAmount: this.state.totalAmount,
          orderStatus: "Pending",
          paymentMethod: buttonName,
          prescriptionImage: this.state.prescriptionImage,
        };
        try {
          await Axios.post("http://localhost:5000/order/post", obj);
          localStorage.removeItem("cartItem");
          localStorage.removeItem("Info");
          localStorage.removeItem("totalItems");
          localStorage.removeItem("totalAmount");
        } catch (error) {
          console.log(error);
        }

        this.showModal();
      } else {
        const obj = {
          customerID: this.state.customerID,
          customerName: this.state.customerName,
          customerEmail: this.state.customerEmail,
          address: this.state.Address,
          city: this.state.City,
          postalCode: this.state.postalCode,
          orderItems: this.state.orderItems,
          totalAmount: this.state.totalAmount,
          orderStatus: "Active",
          paymentMethod: buttonName,
          prescriptionImage: this.state.prescriptionImage,
        };
        try {
          await Axios.post("http://localhost:5000/order/post", obj);
          localStorage.removeItem("cartItem");
          localStorage.removeItem("Info");
          localStorage.removeItem("totalItems");
          localStorage.removeItem("totalAmount");
        } catch (error) {
          console.log(error);
        }

        this.showModal();
      }
    }
  };

  handleBackToCart = (event) => {
    this.props.history.push("/");
  };
  handlePlaceOrderClick = () => {
    this.props.history.push("/placeorder");
  };

  showModal = () => {
    this.setState({ isOpen: true });
  };

  hideModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const b = this.state.totalAmount;
    const d = this.state.paymentMethod;
    if (!this.state.isLoaded)
      return (
        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <h3>Loading...</h3>
          <i className="fas fa-spinner"></i>
        </div>
      );
    else
      return (
        <div className="container-fluid">
          <div className="payment-container">
            <div className="payment">
              <h2> Kindly Confirm Order...</h2>
              <hr />
              <div className="payment-button-holder">
                <button onClick={this.handleDeliveryClick}>
                  Cash on Delivery...
                </button>
                <button onClick={this.handlePlaceOrderClick}>
                  <i
                    style={{ fontSize: "1rem", marginRight: "2%" }}
                    className="fas fa-arrow-left"
                  ></i>
                  Back
                </button>
              </div>
              <Model
                show={this.state.isOpen}
                onHide={this.hideModal}
                header={"Congratulations"}
                bodydesc={"Order Successfully placed "}
                body={"Order No :" + this.state.orderNo}
                name={"Back to Home"}
                handleClick={this.handleBackToCart}
              />
            </div>
          </div>
        </div>
      );
  }
}

export default Payment;
