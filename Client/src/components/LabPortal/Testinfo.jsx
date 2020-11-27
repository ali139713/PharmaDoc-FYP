import Axios from "axios";
import React, { Component } from "react";
import "../../style.scss";
import Card from "../AliComponents/card";
// import Model from '../AliComponents/Model';
class TestInfo extends Component {
  state = {
    propsName: "",
    filteredtests: [{}],

    modaltest: [],

    isOpen: false,

    TEST: [],
    isLoaded: false,
  };

  async componentDidMount() {
    try {
      const {
        match: { params },
      } = this.props;
      this.setState({ propsName: params.description });
      const response = await Axios.get("http://localhost:5000/labtest/get");
      this.setState({ TEST: response.data.labtests });
      const getTest = this.state.TEST;
      const filtered = getTest.filter((t) => t.lab === params.description);
      this.setState({ filteredtests: filtered });
    } catch (error) {
      console.log(error);
    }
  }
  handleRoute = (event) => {
    this.props.history.push("/accreditedlabs");
  };

  handleClick = (id) => {
    const ftests = this.state.filteredtests;
    const refined = ftests.filter((t) => id === t._id);
    this.setState({ modaltest: refined });
    localStorage.setItem("labtest", JSON.stringify(refined));
  };

  showModal = () => {
    this.setState({ isOpen: true });
  };

  hideModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    console.log(this.state.filteredtests);
    return (
      <div id="maindiv" className="container-fluid">
        {/* <Navbar links={routeLinkslab} /> */}
        <div className="separation"></div>
        <div className="container">{/* <Carousel /> */}</div>
        <button
          className="btn btn-info"
          onClick={this.handleRoute}
          style={{ width: "20%" }}
        >
          {" "}
          Back to labs{" "}
        </button>
        <div className="content">
          <div className="heading">
            <hr />
            <h2> Available tests... </h2>
            <hr />
          </div>
        </div>

        <div className="row">
          {this.state.filteredtests.map((obj) => (
            <Card
              handleClick={() => this.handleClick(obj._id)}
              linkTo={"/testpayment"}
              name={obj.lab}
              heading={obj.name}
              pic={false}
              description={obj.description}
              price={"Rs." + obj.price}
            />
          ))}
          {
            // <Model
            //   show={this.state.isOpen}
            //   onHide={this.hideModal}
            //   header={"Name : " + this.state.modaltest.name}
            //   bodydesc={"Description : " + this.state.modaltest.description}
            //   body={"Price : " + this.state.modaltest.price}
            //   name={"Add To Cart"}
            // />
          }
        </div>

        <div className="labDescription">
          <div className="content">
            <h3 style={{ color: "black" }}> PharmaDoc Lab </h3>
          </div>
          <ul>
            <h5 style={{ color: "black" }}> We offer best services...</h5>
            <br />
            <h5 style={{ color: "black" }}>
              {" "}
              Easy appointment of labtest from home..
            </h5>
            <br />
            <h5 style={{ color: "black" }}>
              {" "}
              Saving you from hassle of long queues...
            </h5>
            <br />
            <h5 style={{ color: "black" }}> Reliable...!!!</h5>
            <br />
            <h5 style={{ color: "black" }}> Conveniant...!!!</h5>
          </ul>
        </div>
      </div>
    );
  }
}

export default TestInfo;
