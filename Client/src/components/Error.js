import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

import { Alert } from "reactstrap";

const Error = (props) => {
  const authContext = useContext(AuthContext);
  const [visible, setVisible] = useState(true);
  // const [error, setError] = useState();
  const onDismiss = () => {
    setVisible(false);
    authContext.setError({
      isError: false,
      errorMsg: "Password and Confirm Password do not Match",
    });
  };

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      {props.message}
    </Alert>
  );
};

export default Error;
