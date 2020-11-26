import Axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class AddPharmacy extends Component {


  state = {
    Name: "",
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
    if (this.state.Name) {
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
    toast("Added Successfully!", {
      position: toast.POSITION.TOP_CENTER,

    });
    const obj = {
      name : this.state.Name
    }
    Axios.post('http://localhost:5000/pharmacy/post', obj

    )
      .then(res => {
        console.log(res);
        this.setState({ Name: ""});

      })
      .catch(err => {
        console.log(err);

      })

  }

  render() {


    return (
      <div className="form-style-8">
        <h2>Add Pharmacy</h2>

        <form
          onSubmit={this.fileUploadHandler} >
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
          <ToastContainer />
        </form>
        <div className="buttonHolder">
          <div className="button1">
            <button onClick={this.routeHandler}>Back</button>
          </div>
          <div className="button2">
            <span class="" tabindex="0" data-toggle="tooltip" title="All fields are required">
              <button disabled={this.validate()} onClick={this.fileUploadHandler} >Upload</button>
            </span>
          </div>

        </div>
      </div>
    );
  }
}

export default AddPharmacy;
