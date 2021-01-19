import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../AliComponents/navbar";
import AuthService from "../../Services/AuthServices";
import "../../style.scss";
import routeLinksUser from "../AliComponents/routeLinksUser";
import OrderGrid from "../AliComponents/Ordersgrid";

const Userorders = () => {
  const [allOrders, setAllOrders] = useState(0);
  const [orders, setOrders] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(0);

  const getOrders = async () => {
    /// get orders first time.
    try {
      let val = "";
      AuthService.isAuthenticated().then(async (data) => {
        val = data.user;
        console.log(val);
        setUserID(val._id);
        const response = await Axios.get(
          "http://localhost:5000/order/get/" + val._id
        );
        const Orders = response.data.order;
        setAllOrders(Orders);
        setOrders(Orders);

        for (const c of Orders) {
          let name = "";

          for (const v of c.orderItems) {
            name += v.name + ",";
          }
          const i = Orders.indexOf(c);
          Orders[i].ItemsName = name;
        }
        console.log(orders);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    /// get all orders.

    setLoading(true);

    await setOrders(allOrders);

    for (const c of allOrders) {
      let name = "";

      for (const v of c.orderItems) {
        name += v.name + ",";
      }
      const i = allOrders.indexOf(c);
      allOrders[i].ItemsName = name;
    }
    console.log(orders);
    setLoading(false);
  };

  const getActiveOrders = async () => {
    /// get active orders.

    setLoading(true);

    const activeOrders = allOrders.filter((t) => t.orderStatus === "Active");
    await setOrders(activeOrders);

    for (const c of activeOrders) {
      let name = "";

      for (const v of c.orderItems) {
        name += v.name + ",";
      }
      const i = activeOrders.indexOf(c);
      activeOrders[i].ItemsName = name;
    }
    console.log(orders);
    setLoading(false);
  };
  const getCompletedOrders = async () => {
    /// get completed orders.

    setLoading(true);
    const completedOrders = allOrders.filter(
      (t) => t.orderStatus === "Completed"
    );
    await setOrders(completedOrders);

    for (const c of completedOrders) {
      let name = "";

      for (const v of c.orderItems) {
        name += v.name + ",";
      }
      const i = completedOrders.indexOf(c);
      completedOrders[i].ItemsName = name;
    }
    console.log(orders);
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
    // getActiveOrders();
    // getCompletedOrders();
  }, []); // component did mount

  const activeOrders = () => {
    getActiveOrders();
  }; // get active orders

  const completedOrders = () => {
    getCompletedOrders();
  }; // get completed orders

  if (Loading === true) {
    return (
      <div>
        {" "}
        Loading...<i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  } else {
    return (
      <div id="maindiv" className="container-fluid">
        <Navbar links={routeLinksUser} />
        <div className="separation"></div>
        <div className="content">
          <div className="heading">
            <hr />
            <h2> My Orders... </h2>
            <hr />
          </div>
        </div>
        {/* <Tabs name = "Active" secondName = "Completed"/> */}
        <div className="orderType">
          <button
            style={{ width: "8%", fontSize: "0.8rem" }}
            onClick={getAllOrders}
          >
            All
          </button>
          <button
            style={{ width: "8%", marginLeft: "1%", fontSize: "0.8rem" }}
            onClick={activeOrders}
          >
            Active
          </button>
          <button
            style={{ width: "8%", marginLeft: "1%", fontSize: "0.8rem" }}
            onClick={completedOrders}
          >
            Completed
          </button>
        </div>
        <br />
        <div style={{ height: "500px" }} className="container">
          <OrderGrid data={orders} />
        </div>
      </div>
    );
  }
};

export default Userorders;
