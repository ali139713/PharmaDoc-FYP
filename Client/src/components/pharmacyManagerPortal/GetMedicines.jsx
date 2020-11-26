import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const imageStyle = {
    width: "70px"
};




const Medicine = (props) => (
    <tr>
        <td className={props.med.todo_completed ? 'completed' : ''}>{props.med.name}</td>
        <td className={props.med.todo_completed ? 'completed' : ''}>{props.med.price}</td>
        <td className={props.med.todo_completed ? 'completed' : ''}>{props.med.availability}</td>
        <td className={props.med.todo_completed ? 'completed' : ''}>{props.med.quantity}</td>
        <td className={props.med.todo_completed ? 'completed' : ''}>{props.med.prescription}</td>
        <td className={props.med.todo_completed ? 'completed' : ''}>{props.med.pharmacyName}</td>
        <td className={props.med.todo_completed ? 'completed' : ''}>{<img style={imageStyle} src={props.med.productImage} />}</td>
        <td>
            <Link to={`/pharmacymanager/medicines/updateMedicine/${props.med._id}`}> <i className="fas fa-edit" style={{ fontSize: "1.5rem" }}></i></Link>


        </td>
        <td>
            <i className="fas fa-trash" style={{ fontSize: "1.5rem" }} onClick={() => props.handleDelete(props.med)}></i>
        </td>
    </tr>

)


class GetMedicines extends Component {
    state = {


        medicines: [],

    };


    handleDelete = async (obj) => {
        const meds = this.state.medicines;
        console.log(obj._id)

        try {
            const refined = meds.filter((t) => obj._id !== t._id);
            this.setState({ medicines: refined });
            const response = await Axios.delete('http://localhost:5000/medicine/delete/' + obj._id);

        } catch (error) {
            console.log(error);
            this.setState({ medicines: meds });
        }
    };


    async componentDidMount() {
        try {
            const response = await Axios.get('http://localhost:5000/medicine/get');
            const filtered = response.data.medicines.filter((t)=> t.pharmacyName === "Green Pharmacy") 
            this.setState({ medicines: filtered });
        } catch (error) {
            console.log(error);
        }
    }
    routeBack = () => {

        this.props.history.push("/pharmacymanager");
    }



    render() {
        return (
            <div className="table-responsive">
                <h3 style={{ marginTop: "30px", marginLeft: "30px" }}>Medicines List</h3>
                <button className="btn btn-dark" style={{ marginLeft: "85%" }} onClick={this.routeBack}>Back to dashboard </button>
                <hr />
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Quantity</th>
                            <th>Prescription</th>
                            <th>Pharmacy Name</th>
                            <th>Image</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ overflowY: "auto" }}>
                        {

                            this.state.medicines.map((currentmed, i) => (

                                <Medicine
                                    history={this.props.history}
                                    med={currentmed}
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

export default GetMedicines;