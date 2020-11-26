import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../AliComponents/navbar";
import "../../style.scss";
import TestOrderGrid from "../AliComponents/TestOrdersGrid";
import routeLinksLabManager from "../AliComponents/routeLinksLabManager";

const LabTestOrders = () => {
  const [labtestorders, setLabTestOrders] = useState(0);
  const [Loading, setLoading] = useState(true);

  const getTestOrders = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:5000/labtestorder/get"
      );
      const response1 = response.data.labtestorders.filter(
        (t) => t.lab === "Chughtai Lab"
      );
      setLabTestOrders(response1);
      console.log(response.data.labtestorders);
      console.log(labtestorders);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTestOrders();
  }, []); // component did mount

  if (Loading === true) {
    return <div> Loading...</div>;
  } else {
    return (
      <div id="maindiv" className="container-fluid">
        <Navbar links={routeLinksLabManager} />
        <div className="separation"></div>
        <div className="content">
          <div className="heading">
            <hr />
            <h2> LabTest Orders... </h2>
            <hr />
          </div>
        </div>
        <div style={{ height: "500px" }} className="container">
          <TestOrderGrid data={labtestorders} />
        </div>
      </div>
    );
  }
};

export default LabTestOrders;
