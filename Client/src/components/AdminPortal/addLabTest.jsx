import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.scss';



class Addlabtest extends Component {


  state = {
    Name: "",
    Price: "",
    Lab: "",
    Description: "",
  };


  componentDidMount() {

    window.scrollTo(0, 0);
  }


  handleChange = (event) => {


    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({

      [event.target.name]: event.target.value

    },


    )
  }

  validate = () => {
    if (this.state.Name && this.state.Price && this.state.Lab && this.state.Description) {
      return false;
    }
    else {
      return true;
    }
  }

  routeHandler = () => {

    this.props.history.push('/admin');
  }


  fileUploadHandler = (event) => {
    event.preventDefault();
    toast("Uploaded Successfully!", {
      position: toast.POSITION.TOP_CENTER,

    });
    const obj = {

      name: this.state.Name,
      price: this.state.Price,
      lab: this.state.Lab,
      description: this.state.Description,
    };
    Axios.post('http://localhost:5000/labtest/post', obj)

      .then(res => {
        console.log(res);

        this.setState({ Name: "", Price: "", Lab: "", Description: "" });

      })

      .catch(err => {
        console.log(err);


      })


  }

  render() {
    console.log(this.state.Description);

    return (
      <div className="form-style-8">
        <h2>Add LabTest</h2>

        <form
          onSubmit={this.fileUploadHandler} >
          <div >
            <label >
              Name
                  </label>
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
              Price
                  </label>
            <input
              type="number"
              id="Price"
              placeholder="Enter Price"
              name="Price"
              value={this.state.Price}
              onChange={this.handleChange}
            />
          </div>
          <div >
            <label>
              Lab
                  </label>
            <input
              type="text"
              id="Lab"
              placeholder="Enter Lab"
              name="Lab"
              value={this.state.Lab}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label >
              Description
                  </label>
            <input
              type="text"
              id=" Description"
              placeholder="Enter  Description"
              name="Description"
              value={this.state.Description}
              onChange={this.handleChange}
            />
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

export default Addlabtest;
