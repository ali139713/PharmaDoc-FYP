import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';




const Order = (props) => (
    <tr>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.customerName}</td>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.customerEmail}</td>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.address}</td>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.city}</td>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.postalCode}</td>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.totalAmount}</td>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.publishDate}</td>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.orderStatus}</td>
        <td className={props.ord.todo_completed ? 'completed' : ''}>{props.ord.paymentMethod}</td>
        
        <td>
            <Link to={`/admin/orders/updateOrders/${props.ord._id}`}> <i className="fas fa-edit" style={{ fontSize: "1.5rem" }}></i></Link>


        </td>
        <td>
            <i className="fas fa-trash" style={{ fontSize: "1.5rem" }} onClick={() => props.handleDelete(props.ord)}></i>
        </td>
    </tr>

)


class GetOrders extends Component {
    state = {


        Orders: [],

    };


    handleDelete = async (obj) => {
        const orders = this.state.Orders;
        console.log(obj._id)

        try {
            const refined = orders.filter((t) => obj._id !== t._id);
            this.setState({ Orders: refined });
            const response = await Axios.delete('http://localhost:5000/order/delete/' + obj._id);

        } catch (error) {
            console.log(error);
            this.setState({ Orders: orders });
        }
    };


    async componentDidMount() {
        try {
            const response = await Axios.get('http://localhost:5000/order/get');
            this.setState({ Orders: response.data.orders });
        } catch (error) {
            console.log(error);
        }
    }
    routeBack = () => {

        this.props.history.push("/admin");
    }



    render() {
        return (
            <div className="table-responsive">
                <h3 style={{ marginTop: "30px", marginLeft: "30px" }}>Orders List</h3>
                <button className="btn btn-dark" style={{ marginLeft: "85%" }} onClick={this.routeBack}>Back to dashboard </button>
                <hr />
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>CustomerName</th>
                            <th>CustomerEmail</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>PostalCode</th>
                            <th>TotalAmount</th>
                            <th>PublishDate</th>
                            <th>OrderStatus</th>
                            <th>PaymentMethod</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ overflowY: "auto" }}>
                        {

                            this.state.Orders.map((currentord, i) => (

                                <Order
                                    history={this.props.history}
                                    ord={currentord}
                                    key={i}
                                    handleDelete={this.handleDelete}


                                />
                            ))



                        }

                    </tbody>

                </table>
            </div>
        );
    }
}

export default GetOrders;