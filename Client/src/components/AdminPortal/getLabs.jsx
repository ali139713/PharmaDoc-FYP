import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const imageStyle = {
    width: "70px"
};


const Lab = props => (
    <tr>
        <td className={props.lab.todo_completed ? 'completed' : ''}>{props.lab.name}</td>
        <td className={props.lab.todo_completed ? 'completed' : ''}>{<img style={imageStyle} src={props.lab.labImage} alt="img" />}</td>
        <td> <Link to={`/admin/labs/updateLabs/${props.lab._id}`}> <i className="fas fa-edit" style={{ fontSize: "1.5rem" }}></i></Link>
        </td>
        <td>
            <i className="fas fa-trash" style={{ fontSize: "1.5rem" }} onClick={() => props.handleDelete(props.lab)}></i>
        </td>
    </tr>
)

class getLabs extends Component {
    state = {


        labs: [],

    };

    handleDelete = async (obj) => {
       
        const lab = this.state.labs;
        console.log(obj._id)

        try {
            const refined = lab.filter((t) => obj._id !== t._id);
            this.setState({ labs: refined });
            const response = await Axios.delete('http://localhost:5000/lab/delete/' + obj._id);
            
           
        } catch (error) {
            console.log(error);
            this.setState({ labs: lab});
        }
    };


    async componentDidMount() {
        try {
            const response = await Axios.get('http://localhost:5000/lab/get');
            this.setState({ labs: response.data.labs });
            console.log(response.data.labs)


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
                <h3 style={{ marginTop: "30px", marginLeft: "30px" }}>List of Labs</h3>
                <button className ="btn btn-dark" style={{  marginLeft: "85%" }} onClick={this.routeBack}>Back to dashboard </button>
                <hr />
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ overflowY: "auto" }}>
                        {

                            this.state.labs.map((currentlab, i) => (

                                <Lab
                                    lab={currentlab}
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

export default getLabs;