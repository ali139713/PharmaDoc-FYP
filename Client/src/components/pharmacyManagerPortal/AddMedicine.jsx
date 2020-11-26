import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../style.scss";

class AddMedicine extends Component {
  state = {
    Name: "",
    Price: "",
    Availability: "",
    Quantity: "",
    Prescription: "",
    PharmacyName: "",
    productImage: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  validate = () => {
    if (
      this.state.Name &&
      this.state.Price &&
      this.state.Availability &&
      this.state.Quantity &&
      this.state.Prescription &&
      this.state.PharmacyName &&
      this.state.productImage
    ) {
      return false;
    } else {
      return true;
    }
  };

  fileSelectedHandler = (event) => {
    this.setState({
      productImage: event.target.files[0],
    });
  };

  routeHandler = () => {
    this.props.history.push("/pharmacymanager");
  };

  fileUploadHandler = (event) => {
    event.preventDefault();
    toast("Added Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });

    const fd = new FormData();

    fd.append(
      "productImage",
      this.state.productImage,
      this.state.productImage.name
    );
    fd.append("name", this.state.Name);
    fd.append("price", this.state.Price);
    fd.append("availability", this.state.Availability);
    fd.append("quantity", this.state.Quantity);
    fd.append("prescription", this.state.Prescription);
    fd.append("pharmacyName", this.state.PharmacyName);

    Axios.post("/medicine/post", fd)
      .then((res) => {
        console.log(res);
        this.setState({
          Name: "",
          productImage: "",
          Availability: "",
          Quantity: "",
          Prescription: "",
          PharmacyName: "",
          Price: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="form-style-8">
        <h2>Add Medicine</h2>

        <form onSubmit={this.fileUploadHandler}>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="Name"
              placeholder="Enter Name"
              name="Name"
              value={this.state.Name}
              onChange={this.handleChange}
            />
          </div>

          <ToastContainer />
          <div>
            <label>Price</label>
            <input
              type="number"
              id="Price"
              placeholder="Enter Price"
              name="Price"
              value={this.state.Price}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Availability</label>
            <input
              type="text"
              id="Availability"
              placeholder="Enter Availability"
              name="Availability"
              value={this.state.Availability}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              id="Quantity"
              placeholder="Enter Quantity"
              name="Quantity"
              value={this.state.Quantity}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Prescription</label>
            <input
              type="text"
              id="Prescription"
              placeholder="Enter Prescription"
              name="Prescription"
              value={this.state.Prescription}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label>PharmacyName</label>
            <input
              type="text"
              id="PharmacyName"
              placeholder="Enter PharmacyName"
              name="PharmacyName"
              value={this.state.PharmacyName}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label>
              <input
                style={{ size: "10%" }}
                type="file"
                id="productImage"
                placeholder=""
                name="productImage"
                onChange={this.fileSelectedHandler}
              />
            </label>
          </div>
        </form>
        <div className="buttonHolder">
          <div className="button1">
            <button onClick={this.routeHandler}>Back</button>
          </div>
          <div className="button2">
            <span
              class=""
              tabindex="0"
              data-toggle="tooltip"
              title="All fields are required"
            >
              <button
                disabled={this.validate()}
                onClick={this.fileUploadHandler}
              >
                Upload
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMedicine;
