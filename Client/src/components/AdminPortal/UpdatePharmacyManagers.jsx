import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style.scss";

class UpdatePharmacyManagers extends Component {
  state = {
    firstName: "",
    lastName: "",
    pharmacyName: "",
    Status: "",
  };

  handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  routeHandler = () => {
    this.props.history.push("/admin/pharmacyManagers");
  };

  fileUploadHandler = (event) => {
    event.preventDefault();
    toast("Updated Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      Status: this.state.status,
    };
    Axios.patch(
      "/user/update/pharmacyManagerProfile/" + this.props.match.params.id,
      obj
    )

      .then((res) => {
        console.log(res);
        this.setState({
          firstName: "",
          lastName: "",
          Status: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  validate = () => {
    if (
      this.state.Status &&
      this.state.firstName !== "" &&
      this.state.lastName !== ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="form-style-8">
        <h2>Update Pharmacy Manager</h2>

        <form onSubmit={this.fileUploadHandler}>
          <div>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={this.state.Name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              value={this.state.Name}
              onChange={this.handleChange}
            />
            <select
              className="scrollable-menu"
              id="Status"
              name="Status"
              value={this.state.Status}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Please Choose a status...
              </option>
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
                Update
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdatePharmacyManagers;
