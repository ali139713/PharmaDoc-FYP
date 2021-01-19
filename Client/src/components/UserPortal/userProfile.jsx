import React, { useState, useContext, useEffect } from "react";
import "../../style.scss";
import "../AliComponents/form.scss";
import routeLinks from "../AliComponents/routeLinks";
import Navbar from "../AliComponents/navbar";
import Axios from "axios";
import SpinnerComponent from "../../components/Spinner/Spinner";
import Error from "../../components/Error";
import Navbar from "../AliComponents/navbar";

// ContextAPI
import { AuthContext } from "../../Context/AuthContext";
import FormFile from "react-bootstrap/FormFile";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [cellNumber, setCellNumber] = useState();
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState();
  const userProfileInfo = async () => {
    console.log("Userrrrrrrrrrrr", authContext.user._id);
    await Axios.get("/user/getUser", {
      params: {
        _id: authContext.user._id,
      },
    }).then(async (res) => {
      console.log("res", res);
      setFirstName(res.data.users[0].firstName);
      setLastName(res.data.users[0].lastName);
      setCellNumber(res.data.users[0].cellNumber);
      setEmail(res.data.users[0].email);
      setProfileImage(res.data.users[0].profilePicture);
    });
  };
  useEffect(() => {
    userProfileInfo();
  }, []);

  const fileSelectedHandler = async (event) => {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("profileImage", file, file.name);
    const response = await Axios.post(
      "http://localhost:5000/user/uploadProfileImage",
      fd
    );

    setProfileImage(response.data);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const ID = authContext.user._id;
    Axios.patch("/user/update/userProfile/" + ID, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      cellNumber: cellNumber,
    })

      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const profilePictureUpload = (e) => {
    e.preventDefault();

    const ID = authContext.user._id;
    Axios.patch("/user/update/userProfile/" + ID, {
      profilePicture: profileImage,
    });
  };
  return (
    <div>
      <div id="maindiv" className="container-fluid">
        <Navbar links={routeLinks} />
        <div className="separation"></div>

        <div className="content">
          <div className="heading">
            <hr />
            <h2> WELCOME TO YOUR PROFILE </h2>
            <hr />
          </div>
          <div className="form-holder">
            {/* Profile Image  */}

            <div className="form">
              <form Validate onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <img
                      className="rounded-circle z-depth-2"
                      alt="120x120"
                      src={profileImage}
                      data-holder-rendered="true"
                      style={{ width: "13rem", height: "14rem" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div>
                      <input
                        style={{ size: "10%" }}
                        type="file"
                        id="profileImage"
                        placeholder="Profile Image"
                        name="profileImage"
                        onChange={fileSelectedHandler}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }} className="col-md-6">
                    {" "}
                    <Button
                      style={{ width: "max-content" }}
                      onClick={profilePictureUpload}
                    >
                      {" "}
                      Upload Profile
                    </Button>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <h2
                      style={{
                        backgroundColor: "#1c2237",
                        color: "white",
                        borderRadius: "15px",
                      }}
                    >
                      PERSONAL INFORMATION
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAddress">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAddress">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAddress2">cellNumber</label>
                    <input
                      name="cellNumber"
                      type="number"
                      className="form-control"
                      id="inputAddress2"
                      placeholder="PhoneNo"
                      // max="11"
                      pattern="[0-9]{11}"
                      value={cellNumber}
                      onChange={(e) => {
                        setCellNumber(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAddress2">Email</label>
                    <span
                      tabIndex="0"
                      data-toggle="tooltip"
                      title="Field cannot change"
                    >
                      <input
                        style={{ cursor: "not-allowed" }}
                        name="email"
                        type="email"
                        className="form-control"
                        id="inputAddress2"
                        placeholder="Email"
                        disabled
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
