import React from "react";
import Loader from "react-loader-spinner";
const SpinnerComponent = () => {
  return (
    <Loader
      type="Bars"
      color="#00BFFF"
      height={80}
      width={80}
      //   timeout={3000} //3 secs
    />
  );
};

export default SpinnerComponent;
