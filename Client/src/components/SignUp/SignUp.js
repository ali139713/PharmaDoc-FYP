import React, { useState, useEffect, useRef, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import Button from "react-bootstrap/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Axios from "axios";
import "./Signup.css";
// AuthServices
import AuthService from "../../Services/AuthServices";
import Message from "../Message";
import Error from "../Error";
// ContextAPI
import { AuthContext } from "../../Context/AuthContext";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const authContext = useContext(AuthContext);
  const [validateInfo, setValidateInfo] = useState({
    comfirmPassword: "",
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    pharmacyName: "",
    labName: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);
  const classes = useStyles();

  const onChangeConfirmPassword = (e) => {
    setValidateInfo({ confirmPassword: e.target.value });
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (user.password !== validateInfo.confirmPassword) {
      authContext.setError({
        isError: true,
        errorMsg: "Password and Confirm Password do not Match",
      });
      console.log(authContext.error);
    } else {
      AuthService.register(user)
        .then(async (data) => {
          const { message } = data;
          setMessage(message);
          const obj = {
            name: user.pharmacyName,
            status: "Not Approved",
          };
          await Axios.post("/pharmacy/post", obj)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          const obj2 = {
            name: user.labName,
            status: "Not Approved",
          };
          // post Lab
          await Axios.post("/lab/postLab", obj2)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          // resetForm();
          if (!message.msgError) {
            timerID = setTimeout(() => {
              props.history.push("/sign-in");
            }, 2000);
          }
        })
        .catch();
    }
  };

  useEffect((e) => {
    return () => {
      clearTimeout(timerID);
    };
  });

  const resetForm = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      pharmacyName: "",
      labName: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} Validate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={onChangeConfirmPassword}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              style={{ width: "100%", marginTop: "15px" }}
              className={classes.formControl}
            >
              <InputLabel fullWidth id="demo-simple-select-outlined-label">
                Role
              </InputLabel>
              <Select
                required
                fullWidth
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={user.role}
                onChange={onChange}
                label="role"
                name="role"
              >
                <MenuItem value={"Patient"}>Patient</MenuItem>
                <MenuItem value={"Doctor"}>Doctor</MenuItem>
                <MenuItem value={"Pharmacy Manager"}>Pharmacy Manager</MenuItem>
                <MenuItem value={"Lab Manager"}>Lab Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {user.role === "Pharmacy Manager" ? (
            <TextField
              className="mt-3"
              variant="outlined"
              required
              fullWidth
              id="pharmacyName"
              type="text"
              label="Pharmacy Name"
              name="pharmacyName"
              autoComplete="pharmacyName"
              onChange={onChange}
            />
          ) : (
            ""
          )}
          {user.role === "Lab Manager" ? (
            <TextField
              className="mt-3"
              variant="outlined"
              required
              fullWidth
              id="labName"
              type="text"
              label="Lab Name"
              name="labName"
              autoComplete="labName"
              onChange={onChange}
            />
          ) : (
            ""
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value="submit"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink style={{ color: "black" }} to="/sign-in" variant="body2">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
        {message ? <Message message={message} /> : null}
        {authContext.error.isError ? (
          <Error message={authContext.error.errorMsg} />
        ) : null}
      </div>

      <Box mt={5}></Box>
    </Container>
  );
}
