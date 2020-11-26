import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.scss';

class Updatelab extends Component {


  state = {
    Name: "",
    Image: "",
  };



  handleChange = (event) => {


    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({

      [event.target.name]: event.target.value

    },


    )
  }


  fileSelectedHandler = event => {
    this.setState({


      Image: event.target.files[0]


    })
  }
  validate = () => {
    if (this.state.Name && this.state.Price && this.state.Availability && this.state.Quantity && this.state.Image) {
      return false;
    }
    else {
      return true;
    }
  }

  routeHandler = () => {

    this.props.history.push('/admin/labs');
  }

  fileUploadHandler = async (event) => {
    event.preventDefault();
    toast("Updated Successfully!", {
      position: toast.POSITION.TOP_CENTER,

    });

    const fd = new FormData();
    fd.append('labImage', this.state.Image, this.state.Image.name);
    fd.append('name', this.state.Name)
    const { match: { params } } = this.props;
    // console.log(params)
    console.log("hey")

    try {

      const response = await Axios.put('http://localhost:5000/lab/update/' + this.props.match.params.id, fd)
      console.log(response);
      this.props.history.push("/admin/labs");
      this.setState({ Name: "", Image: "" });

    }

    catch (error) {
      console.log(error);

    }


  }

  render() {


    return (
      <div className="form-style-8">
        <h2>Update Lab</h2>

        <form
          onSubmit={this.fileUploadHandler} >
          <div >

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

              <input style={{ size: "10%" }}
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
            <span class="" tabindex="0" data-toggle="tooltip" title="All fields are required">
              <button disabled={this.validate()} onClick={this.fileUploadHandler}>Upload</button>
            </span>
          </div>

        </div>
      </div>

    );

  }
}

export default Updatelab;
