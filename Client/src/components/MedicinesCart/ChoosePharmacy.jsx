import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class ChoosePharmacy extends Component {
  state = {
    pharmacies: [],
    isLoaded: false,
  };

  async componentDidMount() {
    try {
      const response = await Axios.get("http://localhost:5000/pharmacy/get");
      this.setState({ pharmacies: response.data.pharmacies, isLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    if (this.state.isLoaded === false) {
      return <div> Loading...</div>;
    } else {
      console.log(this.state.pharmacies);
      return (
        <div className="container-fluid">
          <div className="chooselab-container">
            <div className="chooselab">
              <h2> Choose a Pharmacy...</h2>
              <hr />
              <div className="chooselab-button-holder">
                {this.state.pharmacies.map((obj, i) => (
                  <Link to={`/medicines/${obj.name}`}>
                    <button key={i}>{obj.name} </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ChoosePharmacy;
