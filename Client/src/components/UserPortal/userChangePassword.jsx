import React, { useState, useContext, useEffect } from "react";
import "../../style.scss";
import "../AliComponents/form.scss";
import routeLinks from "../AliComponents/routeLinksUser";
import Navbar from "../AliComponents/navbar";
import Error from "../Error";
import Axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import AuthService from "../../Services/AuthServices";
export default function UserChangePassword() {
  const authContext = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [password, setPassword] = useState();
  const [validateInfo, setValidateInfo] = useState({
    comfirmPassword: "",
  });
  console.log("Password : ", password);
  console.log("ConfirmPassword : ", validateInfo.confirmPassword);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== validateInfo.confirmPassword) {
      authContext.setError({
        isError: true,
        errorMsg: "Password and Confirm Password do not Match",
      });
    } else {
      const user = {
        _id: authContext.user._id,
        password: password,
      };
      // setUserInfo({ _id: authContext.user._id, password: password });
      Axios.post("/user/user-change-password", {
        user,
      }).then((res) => {
        //   console.log("res", res);
        //   const { message } = res.data;
        //   setMessage(message);
      });
    }
  };
  return (
    <div>
      <Navbar links={routeLinks} />
      <div
        className="form-holder"
        style={{ backgroundColor: "white", marginTop: "80px" }}
      >
        <div className="form ">
          <h2
            style={{
              backgroundColor: "#1c2237",
              color: "white",
              borderRadius: "15px",
              width: "100%",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Change Password
          </h2>
          <form Validate onSubmit={onSubmit}>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input
                  name="Password"
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setValidateInfo({ confirmPassword: e.target.value });
                  }}
                />
              </div>
            </div>
            {authContext.error.isError ? (
              <Error message={authContext.error.errorMsg} />
            ) : null}
            <button
              style={{ width: "fit-content" }}
              type="submit"
              className="btn btn-primary"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
