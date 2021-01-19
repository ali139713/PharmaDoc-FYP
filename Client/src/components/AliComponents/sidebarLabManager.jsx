import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import BarChart from "./barChart";
import LineChart from "./lineChart";
import PieChart from "./pieChart";
import { AuthContext } from "../../Context/AuthContext";

const barstate = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Orders",
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
      label: "Orders graph",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const SidebarLabManager = () => {
  const authContext = useContext(AuthContext);
  const [labManagerID, setLabManagerID] = useState(authContext.user._id);
  const [ordercount, setorderCount] = useState(0);

  const getLabtestOrders = async () => {
    const response = await Axios.get("http://localhost:5000/labtestorder/get");
    const filtered = response.data.labtestorders.filter(
      (t) => t.lab === "Shaukat khanum"
    );
    setorderCount(filtered.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getLabtestOrders();
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
              <h2>{/*user.name*/}Upload results</h2>
              {/*user.isAdmin && <h6>Admin</h6>*/}
              <hr style={{ backgroundColor: "white" }} />
            </div>

            <br />

            <div className="dashboard-left-menu">
              <Link to={`/labManager/addLabTest/${labManagerID}`}>
                <h5>Add Lab Test</h5>
              </Link>

              <div className="profile-left-text">
                <h2>List</h2>
                {}
                <hr style={{ backgroundColor: "white" }} />
              </div>

              {
                <Link to={`/labtestorders/${labManagerID}`}>
                  <h5>LabTestOrders</h5>
                </Link>
              }

              <hr style={{ backgroundColor: "white" }} />

              <Link to="/logout/">
                <h5>Logout</h5>
              </Link>
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
              Welcome to Lab Manager portal...
            </h2>
            <div className="graphholder ">
              <div className="chart">
                <div className="chart1">
                  <BarChart state={barstate} text="orders" />
                </div>
                <div className="chart2">
                  <LineChart state={linestate} text="orders" />
                </div>
              </div>
            </div>
            <hr />

            <div className="cardsholder2">
              <div className="card1left">
                {/* <i className="zmdi zmdi-account" style={{ fontSize: "5rem" }}></i> */}
                <i
                  className="fas fa-credit-card"
                  style={{ fontSize: "5rem" }}
                ></i>
              </div>
              <div className="card1right">
                <h3 style={{ marginLeft: "3%" }}>
                  {" "}
                  Total No of labtest orders: {ordercount}
                </h3>
              </div>
            </div>
            <hr />
            <br />
            <PieChart text="orders" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLabManager;
