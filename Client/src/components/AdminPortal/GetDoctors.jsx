import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Doctor = (props) => (
  <tr>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.firstName}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.email}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.city}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.address}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.cellNumber}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.fee}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.pmdc}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.startTime}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.endTime}
    </td>
    <td className={props.doc.todo_completed ? "completed" : ""}>
      {props.doc.status}
    </td>

    <td>
      <Link to={`/admin/doctors/updateDoctors/${props.doc._id}`}>
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

class GetDoctors extends Component {
  state = {
    Doctors: [],
  };

  handleDelete = async (obj) => {
    const doctors = this.state.Doctors;
    console.log(obj._id);

    try {
      const refined = doctors.filter((t) => obj._id !== t._id);
      this.setState({ Doctors: refined });
      const response = await Axios.delete("/user/delete/" + obj._id);
    } catch (error) {
      console.log(error);
      this.setState({ Doctors: doctors });
    }
  };

  async componentDidMount() {
    try {
      const response = await Axios.get("/user/getDoctors");
      console.log(
        "response of doctorssssssssssssssssss : ",
        response.data.doctors
      );
      this.setState({ Doctors: response.data.doctors });
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
        <h3 style={{ marginTop: "30px", marginLeft: "30px" }}>Doctors List</h3>
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
              <th>Address</th>
              <th>City</th>
              <th>Email</th>
              <th>CellNumber</th>
              <th>Fee</th>
              <th>PMDC</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ overflowY: "auto" }}>
            {this.state.Doctors.map((currentdoc, i) => (
              <Doctor
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

export default GetDoctors;
