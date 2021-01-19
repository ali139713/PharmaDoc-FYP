import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../AliComponents/navbar";
import "../../style.scss";
import TestOrderGrid from "../AliComponents/TestOrdersGrid";
import routeLinksLabManager from "../AliComponents/routeLinksLabManager";

const LabTestOrders = (props) => {
  const [labtestorders, setLabTestOrders] = useState();
  const [Loading, setLoading] = useState(true);
  const {
    match: { params },
  } = props;

  const [labManagerID, setLabManagerID] = useState(
    props.match.params.labManagerID
  );
  const [labName, setLabName] = useState();

  const getLab = async () => {
    await Axios.get("/User/getLab", { params }).then((res) => {
      setLabName(res.data.labName);
      Axios.get("http://localhost:5000/labtestorder/get").then((res2) => {
        const response1 = res2.data.labtestorders.filter(
          (t) => t.lab === res.data.labName
        );
        console.log("response1: ", response1);
        setLabTestOrders(response1);
        console.log(res2.data.labtestorders);
        console.log(labtestorders);
        console.log("Lab Name: ", labName);
        setLoading(false);
      });
    });
  };
  console.log("LabNameeeeeeeeeeee: ", labName);
  const getTestOrders = async () => {
    // try {
    const response = await Axios.get(
      "http://localhost:5000/labtestorder/get"
    ).then((res) => {
      const response1 = res.data.labtestorders.filter((t) => t.lab === labName);
      console.log("response1: ", response1);
      setLabTestOrders(response1);
      console.log(res.data.labtestorders);
      console.log(labtestorders);
      console.log("Lab Name: ", labName);
      setLoading(false);
    });

    // } catch (error) {
    // console.log(error);
    // }
  };

  useEffect(() => {
    getLab();
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
