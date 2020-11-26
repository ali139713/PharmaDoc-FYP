import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../AliComponents/navbar';
import AuthService from "../../Services/AuthServices";
import "../../style.scss";
import routeLinksUser from '../AliComponents/routeLinksUser';
import OrderGrid from '../AliComponents/Ordersgrid';


const Userorders = () => {

    const [orders, setOrders] = useState(0);
    const [Loading, setLoading] = useState(true);
    const [userID, setUserID] = useState(0);

    const getOrders = async () => {
        try {
            let val = "";
            AuthService.isAuthenticated().then(async (data) => {
                val= (data.user);
                console.log(val)
                setUserID(val._id);
    
           
            const response = await Axios.get('http://localhost:5000/order/get/'+val._id);
            const orders = response.data.order;
            setOrders(response.data.order);
           
            console.log(response.data.order)
           
       
            for (const c of orders) {
                let name = "";

                for (const v of c.orderItems) {
                    name += v.name + ","
                }
                const i = orders.indexOf(c)
                orders[i].ItemsName = name;
            }
            console.log(orders);
            setLoading(false);
    })

        }
        catch (error) {
            console.log(error);
        }
    
    };

    useEffect(() => {
      
        getOrders();
    }, []); // component did mount


    if (Loading === true) {
        return <div> Loading...<i className = "fas fa-spinner fa-spin"></i></div>
    }
    else {
        return (


            <div id="maindiv" className="container-fluid">
                <Navbar links={routeLinksUser} />
                <div className="separation" >

                </div>
                <div className="content">
                    <div className="heading">
                        <hr />
                        <h2> My Orders... </h2>
                        <hr />
                    </div>
                </div>
                <div style={{ height: "500px" }} className="container">

                    <OrderGrid data={orders} />

                </div>



            </div>

        );
    }
};

export default Userorders;