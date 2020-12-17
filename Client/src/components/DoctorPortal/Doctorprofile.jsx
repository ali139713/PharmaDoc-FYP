import React, { useState, useContext, useEffect } from "react";
import "../../style.scss";
import "../AliComponents/form.scss";
import routeLinks from "../AliComponents/routeLinks";
import Navbar from "../AliComponents/navbar";
import Axios from "axios";
import SpinnerComponent from "../../components/Spinner/Spinner";
import Error from "../../components/Error";
// ContextAPI
import { AuthContext } from "../../Context/AuthContext";
import FormFile from "react-bootstrap/FormFile";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const Doctorprofile = () => {
  const authContext = useContext(AuthContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [cellNumber, setCellNumber] = useState();
  const [email, setEmail] = useState();
  const [designation, setDesignation] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [PMDC, setPMDC] = useState();
  const [services, setServices] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [fee, setFee] = useState();
  const [profileImage, setProfileImage] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  const doctorProfileInfo = async () => {
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
      setDesignation(res.data.users[0].specialization);
      setPMDC(res.data.users[0].pmdc);
      setAddress(res.data.users[0].address);
      setCity(res.data.users[0].city);
      setCertificates(res.data.users[0].certificates);
      setServices(res.data.users[0].services);
      setFee(res.data.users[0].fee);
      setProfileImage(res.data.users[0].profilePicture);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    doctorProfileInfo();
  }, []);

  // image upload
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
    Axios.patch("/user/update/doctorProfile/" + ID, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      cellNumber: cellNumber,
      specialization: designation,
      address: address,
      city: city,
      pmdc: PMDC,
      services: services,
      certificates: certificates,
      fee: fee,
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
    // const Obj = {
    //   profilePicture: profileImage,
    // };
    const ID = authContext.user._id;
    Axios.patch("/user/update/doctorProfile/" + ID, {
      profilePicture: profileImage,
    });
  };
  console.log("Profile Image", profileImage);
  if (isLoaded === false) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <SpinnerComponent />
      </div>
    );
  } else
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
                        class="rounded-circle z-depth-2"
                        alt="120x120"
                        src={profileImage}
                        data-holder-rendered="true"
                        style={{ width: "13rem", height: "14rem" }}
                      />
                    </div>
                    <div className="col-md-6">
                      {/* <Form.File
                        id="exampleFormControlFile1"
                        label="Example file input"
                      /> */}
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
                        Variant="primary"
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
                        // pattern="[0-9]{11}"
                        value={cellNumber}
                        onChange={(e) => {
                          setCellNumber(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputAddress2">Email</label>
                      <span
                        tabindex="0"
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
                  <div className="row">
                    <div className="form-group col-md-12">
                      <h2
                        style={{
                          backgroundColor: "#1c2237",
                          color: "white",
                          borderRadius: "15px",
                        }}
                      >
                        CLINIC INFORMATION
                      </h2>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="inputDesignation">Designation</label>
                      <input
                        name="Designation"
                        type="text"
                        className="form-control"
                        id="inputDesignation"
                        placeholder="Designation"
                        value={designation}
                        onChange={(e) => {
                          setDesignation(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputZip">PMDC</label>
                      <input
                        name="PMDC"
                        type="number"
                        className="form-control"
                        id="inputZip"
                        placeholder="PMDC Registration Number"
                        value={PMDC}
                        onChange={(e) => {
                          setPMDC(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCity">Clinic Address</label>
                      <input
                        name="address"
                        type="text"
                        id="inputCity"
                        className="form-control"
                        placeholder="Clinic Address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCity">City</label>
                      <input
                        name="City"
                        type="text"
                        id="inputCity"
                        className="form-control"
                        placeholder="City"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCertificates">Certificates</label>
                      <input
                        name="Certificates"
                        type="text"
                        id="inputCertificates"
                        className="form-control"
                        placeholder="Certificates"
                        value={certificates}
                        onChange={(e) => {
                          setCertificates(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputServices">Services</label>
                      <input
                        name="Services"
                        type="text"
                        id="inputServices"
                        className="form-control"
                        placeholder="Services"
                        value={services}
                        onChange={(e) => {
                          setServices(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputZip">Fee</label>
                      <input
                        name="fee"
                        type="number"
                        className="form-control"
                        id="inputZip"
                        placeholder="Fee"
                        value={fee}
                        onChange={(e) => {
                          setFee(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  {authContext.error.isError ? (
                    <Error message={authContext.error.errorMsg} />
                  ) : null}
                  <div className="form-group col-md-6">
                    {/* <input name="ProfileImage" type="file" className="form-control" id="profileimage" placeholder="Profile picture" name="profileimage" style={{display:""}} onChange={fileSelectedHandler}/> */}
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

export default Doctorprofile;
