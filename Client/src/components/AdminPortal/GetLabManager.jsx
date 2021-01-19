import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Manager } from "socket.io-client";

const Managers = (props) => (
  <tr>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.firstName}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.lastName}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.email}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.status}
    </td>

    <td>
      <Link to={`/admin/labManagers/updateLabManager/${props.doc._id}`}>
        {" "}
        <i className="fas fa-edit" style={{ fontSize: "1.5rem" }}></i>
      </Link>
    </td>
    <td>
      <i
        className="fas fa-trash"
        style={{ fontSize: "1.5rem" }}
        onClick={() => props.handleDelete(props.doc)}
      ></i>
    </td>
  </tr>
);

class GetLabManager extends Component {
  state = {
    managers: [],
  };

  handleDelete = async (obj) => {
    const man = this.state.managers;
    console.log(obj._id);

    try {
      const refined = man.filter((t) => obj._id !== t._id);
      this.setState({ managers: refined });
      const response = await Axios.delete("/user/delete/" + obj._id);
    } catch (error) {
      console.log(error);
      this.setState({ managers: man });
    }
  };

  async componentDidMount() {
    try {
      const response = await Axios.get("/user/getLabManagers");
      this.setState({ managers: response.data.managers });
    } catch (error) {
      console.log(error);
    }
  }
  routeBack = () => {
    this.props.history.push("/admin");
  };

  render() {
    return (
      <div className="table-responsive">
        <h3 style={{ marginTop: "30px", marginLeft: "30px" }}>
          Pharmacy Managers List
        </h3>
        <button
          className="btn btn-dark"
          style={{ marginLeft: "85%" }}
          onClick={this.routeBack}
        >
          Back to dashboard{" "}
        </button>
        <hr />
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead className="thead-dark">
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ overflowY: "auto" }}>
            {this.state.managers.map((currentdoc, i) => (
              <Managers
                history={this.props.history}
                doc={currentdoc}
                key={i}
                handleDelete={this.handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GetLabManager;
