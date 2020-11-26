import React from "react";
// import FlashMessage from "react-flash-message";
const getStyle = (props) => {
  let baseClass = "alert ";
  if (props.message.msgError) baseClass = baseClass + "alert-danger";
  else baseClass = baseClass + "alert-primary";
  return baseClass + "text-center";
};

const Message = (props) => {
  return (
    <div className={getStyle(props)} role="alert">
      {props.message.msgBody}
    </div>
  );
};

// import React, { useContext, useState } from "react";
// import { AuthContext } from "../Context/AuthContext";

// import { Alert } from "reactstrap";

// const Message = (props) => {
//   const authContext = useContext(AuthContext);
//   const [visible, setVisible] = useState(true);
//   // const [error, setError] = useState();
//   const onDismiss = () => {
//     setVisible(false);
//     authContext.setError({
//       isError: false,
//       errorMsg: "Password and Confirm Password do not Match",
//     });
//   };

//   return (
//     <Alert color="info" isOpen={visible} toggle={onDismiss}>
//       {props.message.msgBody}
//     </Alert>
//   );
// };

export default Message;
