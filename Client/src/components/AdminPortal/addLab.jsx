import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../style.scss";

class Addlab extends Component {
  state = {
    Name: "",
    Image: "",
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
    if (this.state.Name && this.state.Image) {
      return false;
    } else {
      return true;
    }
  };

  fileSelectedHandler = (event) => {
    this.setState({
      Image: event.target.files[0],
    });
  };

  routeHandler = () => {
    this.props.history.push("/admin");
  };

  fileUploadHandler = (event) => {
    event.preventDefault();
    toast("Uploaded Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });

    const fd = new FormData();

    fd.append("labImage", this.state.Image, this.state.Image.name);
    fd.append("name", this.state.Name);
    Axios.post("http://localhost:5000/lab/post", fd)
      .then((res) => {
        console.log(res);
        this.setState({ Name: "", Image: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="form-style-8">
        <h2>Add Lab</h2>

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
            <label>
              <input
                style={{ size: "10%" }}
                type="file"
                id="Image"
                placeholder=""
                name="Image"
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

export default Addlab;
