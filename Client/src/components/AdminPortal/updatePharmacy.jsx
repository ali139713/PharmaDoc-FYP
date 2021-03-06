import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style.scss";

class UpdatePharmacy extends Component {
  state = {
    Name: "",
    status: "",
  };

  handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  routeHandler = () => {
    this.props.history.push("/admin/pharmacy");
  };

  fileUploadHandler = (event) => {
    event.preventDefault();
    toast("Updated Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
    const obj = {
      name: this.state.Name,
      status: this.state.status,
    };
    Axios.patch(
      "http://localhost:5000/pharmacy/update/" + this.props.match.params.id,
      obj
    )

      .then((res) => {
        console.log(res);
        this.setState({ Name: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  validate = () => {
    if (this.state.Name && this.state.status) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="form-style-8">
        <h2>Update pharmacy</h2>

        <form onSubmit={this.fileUploadHandler}>
          <div>
            <input
              type="text"
              id="Name"
              placeholder="Enter Name"
              name="Name"
              value={this.state.Name}
              onChange={this.handleChange}
            />

            <select
              className="scrollable-menu"
              id="status"
              name="status"
              placeholder="Choose a Status"
              value={this.state.status}
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

export default UpdatePharmacy;
