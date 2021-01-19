import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { AuthContext } from "../../Context/AuthContext";
import Axios from "axios";
import routeLinks from "../AliComponents/routeLinks";
import Navbar from "../AliComponents/navbar";
import SpinnerComponent from "../../components/Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function DoctorprofileSec() {
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
      // console.log("res", res);
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

  const classes = useStyles();

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
  if (isLoaded === false) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <SpinnerComponent />
      </div>
    );
  } else
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Navbar links={routeLinks} />
        <div className={classes.paper}>
          {/* <Typography component="h1" variant="h3">
          Welcome To Your Profile
        </Typography> */}
          <form onSubmit={onSubmit} className={classes.form} Validate>
            <div className="row">
              <div className="col-md-12 text-center">
                <img
                  class="rounded-circle z-depth-2 "
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ width: "max-content" }}
                  Variant="primary"
                  onClick={profilePictureUpload}
                >
                  {" "}
                  Upload Profile
                </Button>
              </div>
            </div>
            <div className="row mt-6">
              <div className=" col-md-12 mt-2">
                <h3
                  style={{
                    backgroundColor: "#1c2237",
                    color: "white",
                    borderRadius: "5px",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  PERSONAL INFORMATION
                </h3>
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="Number"
                  id="cellNumber"
                  label="Cell Number"
                  name="cellNumber"
                  autoComplete="cellNumber"
                  autoFocus
                  value={cellNumber}
                  onChange={(e) => {
                    setCellNumber(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  disabled={true}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className=" col-md-12 mt-4">
                <h3
                  style={{
                    backgroundColor: "#1c2237",
                    color: "white",
                    borderRadius: "5px",
                    textAlign: "center",
                    padding: "3px",
                  }}
                >
                  CLINIC INFORMATION
                </h3>
              </div>
              <div className="col-sm-6">
                <FormControl
                  variant="outlined"
                  style={{ width: "100%", marginTop: "15px" }}
                  className={classes.formControl}
                >
                  <InputLabel fullWidth id="demo-simple-select-outlined-label">
                    Specialization
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={designation}
                    onChange={(e) => {
                      setDesignation(e.target.value);
                    }}
                    label="specialization"
                    name="specialization"
                  >
                    <MenuItem value={"Gynecologist"}>Gynecologist</MenuItem>
                    <MenuItem value={"Skin Specialist"}>
                      Skin Specialist
                    </MenuItem>
                    <MenuItem value={"Child Specialist"}>
                      Child Specialist
                    </MenuItem>
                    <MenuItem value={"Orthopedic Surgeon"}>
                      Orthopedic Surgeon
                    </MenuItem>
                    <MenuItem value={"ENT Specialist"}>ENT Specialist</MenuItem>
                    <MenuItem value={"Diabetes Specialist"}>
                      Diabetes Specialist
                    </MenuItem>
                    <MenuItem value={"Eye Specialist"}>Eye Specialist</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="Number"
                  id="pmdcNumber"
                  label="PMDC Registration Number"
                  name="pmdcNumber"
                  autoComplete="pmdcNumber"
                  autoFocus
                  value={PMDC}
                  onChange={(e) => {
                    setPMDC(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="cinicAddress"
                  label="Clinic Address"
                  name="cinicAddress"
                  autoComplete="cinicAddress"
                  autoFocus
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  autoFocus
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="education"
                  label="Education"
                  name="education"
                  autoComplete="education"
                  autoFocus
                  value={certificates}
                  onChange={(e) => {
                    setCertificates(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="services"
                  label="Services"
                  name="services"
                  autoComplete="services"
                  autoFocus
                  value={services}
                  onChange={(e) => {
                    setServices(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-6 col-sm-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="Number"
                  id="fee"
                  label="Fee"
                  name="fee"
                  autoComplete="fee"
                  autoFocus
                  value={fee}
                  onChange={(e) => {
                    setFee(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-sm-12 text-center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                value="submit"
                className={classes.submit}
                style={{ width: "max-content" }}
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
}
