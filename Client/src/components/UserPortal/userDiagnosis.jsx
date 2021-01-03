import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import Navbar from "../AliComponents/navbar";
import "../../style.scss";
import routeLinks from "../AliComponents/routeLinksUser";
import UserDiagnosisGrid from "../AliComponents/UserDiagnosisGrid";
import SpinnerComponent from "../../components/Spinner/Spinner";
import Tab from "../AliComponents/tabs";
// ContextAPI
import { AuthContext } from "../../Context/AuthContext";

const UserDiagnosis = () => {
  const authContext = useContext(AuthContext);
  var [userDiagnosis, setUserDiagnosis] = useState();
  var [userID, setUserID] = useState(authContext.user._id);
  const [isLoaded, setisLoaded] = useState(false);

  const diagnosisofUser = async () => {
    await Axios.get("/AddDiagnosis/getDiagnosis", {
      params: {
        userID: userID,
      },
    }).then(async (res) => {
      let array = [];
      //   console.log("res of Diagnosis", res.data);
      for await (let variable of res.data) {
        for await (let arr of variable.diagnose) {
          arr.doctorName = variable.doctorName;
          //   console.log("Arr : ", arr);
          array.push(arr);
        }
      }

      setUserDiagnosis(array);
      //   console.log("new Array", array);
    });
  };

  useEffect(() => {
    diagnosisofUser();
  }, []);
  //   if (isLoaded === true) {
  //     return (
  //       <div style={{ textAlign: "center", marginTop: "20%" }}>
  //         <SpinnerComponent />
  //       </div>
  //     );
  //   } else {
  return (
    <div id="maindiv" className="container-fluid">
      <Navbar links={routeLinks} />
      <div className="separation"></div>
      <div className="content">
        <div className="heading">
          <hr />
          <h2> My Diagnosis... </h2>
          <hr />
        </div>
      </div>

      <Tab name="Active" secondName="Completed" />

      <div style={{ height: "500px" }}>
        <UserDiagnosisGrid rowData={userDiagnosis} />
      </div>
    </div>
  );
};
// };

export default UserDiagnosis;
