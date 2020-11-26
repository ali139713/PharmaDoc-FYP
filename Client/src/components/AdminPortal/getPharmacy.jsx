import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const iStyles = {

    fontSize: "90%"
}


const Pharmacy = props => (
    <tr>
        <td className={props.pharmacy.todo_completed ? 'completed' : ''}>{props.pharmacy.name}</td>
        <td> <Link to={`/admin/pharmacy/updatePharmacy/${props.pharmacy._id}`}> <i className="fas fa-edit" style={{ fontSize: "1.5rem" }}></i></Link>
        </td>
        <td>
            <i className="fas fa-trash" style={{ fontSize: "1.5rem" }} onClick={() => props.handleDelete(props.pharmacy)}></i>
        </td>
    </tr>
)

class getPharmacy extends Component {
    state = {


        pharmacies: [],

    };
    handleDelete = async (obj) => {

        const pharma = this.state.pharmacies;


        try {
            const refined = pharma.filter((t) => obj._id !== t._id);
            this.setState({ pharmacies: refined });
            const response = await Axios.delete('http://localhost:5000/pharmacy/delete/' + obj._id);


        } catch (error) {
            console.log(error);
            this.setState({ pharmacies: pharma });
        }
    };


    async componentDidMount() {
        try {
            const response = await Axios.get('http://localhost:5000/pharmacy/get');
            this.setState({ pharmacies: response.data.pharmacies });



        } catch (error) {
            console.log(error);
        }
    }

    routeBack = () => {

        this.props.history.push("/admin");
    }


    render() {
        console.log(this.state.pharmacies)
        return (
            <div className="table-responsive">
                <h3 style={{ marginTop: "30px", marginLeft: "30px" }}>List of Pharmacies...</h3>
                <button className="btn btn-dark" style={{ marginLeft: "85%" }} onClick={this.routeBack}>Back to dashboard </button>
                <hr />
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ overflowY: "auto" }}>
                        {

                            this.state.pharmacies.map((currentpharmacy, i) => (

                                <Pharmacy
                                    pharmacy={currentpharmacy}
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

export default getPharmacy;