import Axios from "axios";
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.scss';







class UpdateMedicine extends Component {


  state = {
    Name: "",
    Price: "",
    Availability: "",
    Quantity: "",
    Prescription:"",
    PharmacyName:"",
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
    if (this.state.Name && this.state.Price && this.state.Availability && this.state.Quantity && this.state.Image && this.state.Prescription && this.state.PharmacyName) {
      return false;
    }
    else {
      return true;
    }
  }

  routeHandler = event => {
    this.props.history.push('/pharmacymanager/medicines');
  }



  fileUploadHandler = (event) => {
    event.preventDefault();
    toast("Updated Successfully!", {
      position: toast.POSITION.TOP_CENTER,

    });
    const fd = new FormData();
    fd.append('productImage', this.state.Image, this.state.Image.name);
    fd.append('name', this.state.Name)
    fd.append('price', this.state.Price)
    fd.append('availability', this.state.Availability)
    fd.append('quantity', this.state.Quantity)
    fd.append('prescription', this.state.Prescription)
    fd.append('pharmacyName', this.state.PharmacyName)

    const { match: { params } } = this.props;

    // console.log(params)



    Axios.patch('http://localhost:5000/medicine/update/' + this.props.match.params.id, fd)

      .then(res => {
        console.log(res);
        this.setState({ Name: "", Image: "", Price: "", Availability: "", Quantity: "" , Prescription:"", pharmacyName:""});

      })
      .catch(err => {
        console.log(err);

      })
  }
  render() {


    return (
      <div className="form-style-8">


        <h2>Update Medicine</h2>


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
              required
            />
          </div>
          <ToastContainer />

          <div>

            <input
              type="number"
              id="Price"
              placeholder="Enter Price"
              name="Price"
              value={this.state.Price}
              onChange={this.handleChange}
              required
            />
          </div>
          <div >

            <input
              type="text"
              id="Availability"
              placeholder="Enter Availability"
              name="Availability"
              value={this.state.Availability}
              required

              onChange={this.handleChange}
            />
          </div>
          <div>

            <input
              type="number"
              id="Quantity"
              placeholder="Enter Quantity"
              name="Quantity"
              value={this.state.Quantity}
              onChange={this.handleChange}
              required
            />
          </div>
          <div >
            <label >
              Prescription
            </label>
            <input

              type="text"
              id="Prescription"
              placeholder="Enter Prescription"
              name="Prescription"
              value={this.state.Prescription}
              onChange={this.handleChange}
            />
          </div>

          <div >
            <label >
              PharmacyName
            </label>
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


              <input style={{ size: "10%" }}
                type="file"
                id="Image"
                placeholder=""
                name="Image"
                required

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

export default withRouter(UpdateMedicine);
