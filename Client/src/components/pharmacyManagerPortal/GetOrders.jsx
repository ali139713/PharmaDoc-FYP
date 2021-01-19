import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const imageStyle = {
  width: "70px",
};

const Order = (props) => (
  <tr>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {props.ord.customerName}
    </td>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {props.ord.customerEmail}
    </td>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {props.ord.address}
    </td>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {props.ord.city}
    </td>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {" "}
      <img style={imageStyle} src={props.ord.prescriptionImage} />
    </td>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {props.ord.totalAmount}
    </td>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {props.ord.publishDate}
    </td>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {props.ord.orderStatus}
    </td>
    <td className={props.ord.todo_completed ? "completed" : ""}>
      {props.ord.paymentMethod}
    </td>

    <td>
      <Link to={`/pharmacymanager/orders/updateOrders/${props.ord._id}`}>
        {" "}
        <i className="fas fa-edit" style={{ fontSize: "1.5rem" }}></i>
      </Link>
    </td>
    <td>
      <i
        className="fas fa-trash"
        style={{ fontSize: "1.5rem" }}
        onClick={() => props.handleDelete(props.ord)}
      ></i>
    </td>
  </tr>
);

class GetOrders extends Component {
  state = {
    Orders: [],
    pharmacyName: "",
  };
  getPharmacy = async () => {
    const {
      match: { params },
    } = this.props;
    await this.setState({
      pharmacistID: params.pharmacistID,
    });
    const ID = params.pharmacistID;
    console.log("ID:", ID);
    await Axios.get("/User/getPharmacy", { params }).then((res) => {
      this.setState({
        pharmacyName: res.data.pharmacyName,
      });
    });
  };

  handleDelete = async (obj) => {
    const orders = this.state.Orders;
    console.log(obj._id);

    try {
      const refined = orders.filter((t) => obj._id !== t._id);
      this.setState({ Orders: refined });
      const response = await Axios.delete(
        "http://localhost:5000/order/delete/" + obj._id
      );
    } catch (error) {
      console.log(error);
      this.setState({ Orders: orders });
    }
  };

  async componentDidMount() {
    let filteredOrders = [];
    await this.getPharmacy();
    try {
      const response = await Axios.get("http://localhost:5000/order/get");
      filteredOrders = response.data.orders.filter(
        (t) => t.pharmacyName === this.state.pharmacyName
      );
      this.setState({ Orders: filteredOrders });
    } catch (error) {
      console.log(error);
    }
  }
  routeBack = () => {
    this.props.history.push("/pharmacymanager");
  };

  render() {
    return (
      <div className="table-responsive">
        <h3 style={{ marginTop: "30px", marginLeft: "30px" }}>Orders List</h3>
        <button
          className="btn btn-dark"
          style={{ marginLeft: "85%" }}
          onClick={this.routeBack}
        >
          Back to dashboard{" "}
        </button>
        <hr />
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead className="thead-dark">
            <tr>
              <th>CustomerName</th>
              <th>CustomerEmail</th>
              <th>Address</th>
              <th>City</th>
              <th>Prescription</th>
              <th>TotalAmount</th>
              <th>PublishDate</th>
              <th>OrderStatus</th>
              <th>PaymentMethod</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ overflowY: "auto" }}>
            {this.state.Orders.map((currentord, i) => (
              <Order
                history={this.props.history}
                ord={currentord}
                key={i}
                handleDelete={this.handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GetOrders;
