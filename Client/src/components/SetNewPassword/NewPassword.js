import React, { useState, useEffect, useRef, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink, useParams } from "react-router-dom";

// import "./Signup.css";
import AuthService from "../../Services/AuthServices";
import Message from "../Message";
import Error from "../Error";
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

export default function NewPassword(props) {
  const authContext = useContext(AuthContext);
  let timerID = useRef(null);
  const acceptedtoken = useParams().token;
  console.log("acceptedtoken", acceptedtoken);
  const [validateInfo, setValidateInfo] = useState({
    comfirmPassword: "",
  });
  const [userInfo, setUserInfo] = useState({
    password: "",
    token: "",
  });

  const [message, setMessage] = useState(null);

  // let timerID = useRef(null);

  const classes = useStyles();

  const onChangeConfirmPassword = (e) => {
    setValidateInfo({ confirmPassword: e.target.value });
    // console.log(validateInfo.confirmPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUserInfo({ password: userInfo.password, token: acceptedtoken });
    console.log(userInfo);
    if (userInfo.password !== validateInfo.confirmPassword) {
      authContext.setError({
        isError: true,
        errorMsg: "Password and Confirm Password do not Match",
      });
    } else {
      console.log(userInfo);
      AuthService.setNewPassword(userInfo)
        .then((data) => {
          const { message } = data;
          setMessage(message);
          timerID = setTimeout(() => {
            props.history.push("/sign-in");
          }, 2000);
        })
        .catch();
    }
  };

  useEffect((e) => {
    return () => {
      clearTimeout(timerID);
    };
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset Form
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} Validate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setUserInfo({
                    password: e.target.value,
                    token: acceptedtoken,
                  });
                }}
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value="submit"
            className={classes.submit}
          >
            Reset Password
          </Button>
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
