import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import Button from "react-bootstrap/Button";
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
import AuthService from "../../Services/AuthServices";
// ContextAPI
import { AuthContext } from "../../Context/AuthContext";
import Message from "../Message";

//Forgotpassword
import Modal from "react-bootstrap/Modal";

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

export default function AdminLogin(props) {
  // ForgotPassword
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [forgotEmail, setForgotEmail] = useState();
  // ForgotPasswordEnd
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user)
      .then((data) => {
        const { isAuthenticated, user, message } = data;

        if (isAuthenticated && user.role === "Admin") {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          if (user.role === "Admin") {
            props.history.push("/admin");
            window.location.reload(true);
          }
        } else {
          setMessage(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    AuthService.resetPassword({ email: forgotEmail })
      .then((data) => setMessage(data.message))
      .catch((err) => console.log(err));
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Acount
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} Validate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item md>
              <Link onClick={handleShow} to="" variant="body2">
                {" Forgot password?"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {message ? <Message message={message} /> : null}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={onSubmitModal} className={classes.form} Validate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                id="forgotEmail"
                label="Email Address"
                name="forgotEmail"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setForgotEmail(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send
              </Button>
            </form>
            {message ? <Message message={message} /> : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
