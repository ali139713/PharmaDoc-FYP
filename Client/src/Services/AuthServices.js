import Axios from "axios";
export default {
  login: (user) => {
    console.log(user);
    return fetch("/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: {
            email: "",
            role: "",
          },
          message: { msgBody: "Invalid Email or Password", msgError: true },
        };
    });
  },
  register: (user) => {
    console.log(user);
    console.log("in Method");

    return fetch("/user/register", {
      method: "post",
      body: JSON.stringify(user),

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  resetPassword: (email) => {
    console.log(email);
    console.log("Reset Password Method");
    return fetch("/user/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {});
  },

  setNewPassword: (userInfo) => {
    console.log(userInfo);
    console.log("in SetNewPassword");

    return fetch("/user/new-password", {
      method: "post",
      body: JSON.stringify(userInfo),

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },

  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: { _id: "", firstName: "", lastName: "", email: "", role: "" },
        };
    });
  },
};
