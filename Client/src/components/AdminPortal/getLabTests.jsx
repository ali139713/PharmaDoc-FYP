import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const iStyles = {

    fontSize: "90%"
}


const LabTest = props => (
    <tr>
        <td className={props.labtest.todo_completed ? 'completed' : ''}>{props.labtest.name}</td>
        <td className={props.labtest.todo_completed ? 'completed' : ''}>{props.labtest.price}</td>
        <td className={props.labtest.todo_completed ? 'completed' : ''}>{props.labtest.lab}</td>
        <td className={props.labtest.todo_completed ? 'completed' : ''}>{props.labtest.description}</td>

        <td> <Link to={`/admin/labtests/updateLabTests/${props.labtest._id}`}> <i className="fas fa-edit" style={{ fontSize: "1.5rem" }}></i></Link>
        </td>
        <td>
        <i className="fas fa-trash" style={{ fontSize: "1.5rem" }} onClick={() => props.handleDelete(props.labtest)}></i>
        </td>
    </tr>
)

class getLabTests extends Component {
    state = {


        labtests: [],

    };
    handleDelete = async (obj) => {

        const labt = this.state.labtests;
        

        try {
            const refined = labt.filter((t) => obj._id !== t._id);
            this.setState({ labtests: refined });
            const response = await Axios.delete('http://localhost:5000/labtest/delete/' + obj._id);


        } catch (error) {
            console.log(error);
            this.setState({ labtests: labt });
        }
    };


    async componentDidMount() {
        try {
            const response = await Axios.get('http://localhost:5000/labtest/get');
            this.setState({ labtests: response.data.labtests });
            


        } catch (error) {
            console.log(error);
        }
    }

    routeBack = () =>{

        this.props.history.push("/admin");
    }


    render() {
        return (
            <div className="table-responsive">
                <h3 style={{ marginTop: "30px", marginLeft: "30px" }}>List of LabTests...</h3>
                    <button className ="btn btn-dark" style={{  marginLeft: "85%" }} onClick={this.routeBack}>Back to dashboard </button>
                <hr />
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Lab</th>
                            <th>Description</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ overflowY: "auto" }}>
                        {

                            this.state.labtests.map((currentlabtest, i) => (

                                <LabTest
                                    labtest={currentlabtest}
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

export default getLabTests;