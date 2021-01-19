import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import BarChart from "./barChart";
import LineChart from "./lineChart";
import PieChart from "./pieChart";

const barstate = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Sales",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const linestate = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Sales graph",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const Sidebar = () => {
  const [medcount, setmedCount] = useState(0);
  const [labcount, setlabCount] = useState(0);
  const [labtestcount, setlabtestCount] = useState(0);
  const [ordercount, setOrderCount] = useState(0);

  const getMedicines = async () => {
    const response = await Axios.get("http://localhost:5000/medicine/get");
    setmedCount(response.data.count);
  };

  const getLabs = async () => {
    const response = await Axios.get("http://localhost:5000/lab/get");
    setlabCount(response.data.count);
  };

  const getLabTests = async () => {
    const response = await Axios.get("http://localhost:5000/labtest/get");
    setlabtestCount(response.data.count);
  };

  const getOrders = async () => {
    const response = await Axios.get("http://localhost:5000/order/get");
    setOrderCount(response.data.count);
  };

  useEffect(() => {
    getMedicines();
    getLabs();
    getLabTests();
    getOrders();
  }, []); // component did mount

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-md-2 p-2">
          <div className="dashboard-left-block">
            <div
              className="dashboard-pic-circle"
              style={
                {
                  /*backgroundImage: 'url(' + user.profilePic + ')'*/
                }
              }
            ></div>
            <div className="profile-left-text">
              {/* <h2>Add products</h2> */}

              <hr style={{ backgroundColor: "white" }} />
            </div>

            <br />

            <div className="dashboard-left-menu">
              {/* <Link to="/admin/addPharmacy">
                <h5>Add Pharmacy</h5>
              </Link>
              <Link to="/admin/addLab">
                <h5>Add Lab</h5>
              </Link>
              <Link to="/admin/addLabTest">
                <h5>Add Labtest</h5>
              </Link> */}

              <div className="profile-left-text">
                <h2>List</h2>
                {}
                <hr style={{ backgroundColor: "white" }} />
              </div>
              {
                /*user.isAdmin && (*/
                <Link to="/admin/pharmacy">
                  <h5>Pharmacy</h5>
                </Link>
              }

              <Link to="/admin/labs">
                <h5>Labs</h5>
              </Link>

              {
                /*user.isAdmin && (*/
                <Link to="/admin/labtests">
                  <h5>Labtests</h5>
                </Link>
              }

              {
                /*user.isAdmin && (*/
                // <Link to="/admin/orders">
                //   <h5>Orders</h5>
                // </Link>
              }
              {
                /*user.isAdmin && (*/
                <Link to="/admin/doctors">
                  <h5>Doctors</h5>
                </Link>
              }
              {
                <Link to="/admin/pharmacyManagers">
                  <h5>Pharmacy Managers</h5>
                </Link>
              }
              {
                <Link to="/admin/labManagers">
                  <h5>Lab Managers</h5>
                </Link>
              }
              <hr style={{ backgroundColor: "white" }} />

              {/* <Link to="/logout/">
                <h5>Logout</h5>
              </Link> */}
            </div>
          </div>
        </div>

        <div className="col-md-10 dashboard-right-block">
          <div className="container-fluid col md-4">
            <h2
              style={{
                marginTop: "20px",
                marginLeft: "28%",
                fontStyle: "italic",
              }}
            >
              {" "}
              Welcome to Admin portal...
            </h2>
            <div className="graphholder ">
              <div className="chart">
                <div className="chart1">
                  <BarChart state={barstate} />
                </div>
                <div className="chart2">
                  <LineChart state={linestate} />
                </div>
              </div>
            </div>
            <hr />

            <div className="cardsholder">
              <div className="card1">
                <h3> Total medicines in inventory: {medcount}</h3>
              </div>
              <p style={{ color: "transparent" }}> asd</p>
              <div className="card2">
                <h3> Total No of labs: {labcount}</h3>
              </div>
              <p style={{ color: "transparent" }}> asd</p>
              <div className="card3">
                <h3 style={{ marginTop: "10%" }}>
                  {" "}
                  Total No of labtests: {labtestcount}
                </h3>
              </div>
            </div>
            <hr />
            <div className="cardsholder2">
              <div className="card1left">
                {/* <i className="zmdi zmdi-account" style={{ fontSize: "5rem" }}></i> */}
                <i className="fas fa-user" style={{ fontSize: "5rem" }}></i>
              </div>
              <div className="card1right">
                <h3 style={{ marginLeft: "3%" }}>
                  {" "}
                  Total No of User: {medcount}
                </h3>
              </div>

              <p style={{ color: "transparent" }}> asd</p>

              <div className="card2left">
                <i
                  className="fas fa-credit-card"
                  style={{ fontSize: "5rem" }}
                ></i>
              </div>
              <div className="card2right">
                <h3 style={{ marginLeft: "3%" }}>
                  {" "}
                  Total No of Orders: {ordercount}
                </h3>
              </div>
            </div>
            <hr />
            <br />
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
