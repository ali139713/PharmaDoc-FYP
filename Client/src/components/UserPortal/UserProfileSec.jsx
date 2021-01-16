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
export default function UserProfileSec() {
  const authContext = useContext(AuthContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [cellNumber, setCellNumber] = useState();
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState();
  const classes = useStyles();

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
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={onSubmit} className={classes.form} Validate>
          <div className="row text-center">
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
                variant="contained"
                color="primary"
                style={{ width: "max-content" }}
                onClick={profilePictureUpload}
              >
                {" "}
                Upload Picture
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
          </div>
        </form>
      </div>
    </Container>
  );
}
