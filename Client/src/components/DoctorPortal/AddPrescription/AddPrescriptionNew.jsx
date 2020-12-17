import React, { useState, Fragment, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const AddPrescriptionNew = (props) => {
  const authContext = useContext(AuthContext);
  // const [doctorID, setDoctorID] = useState(authContext.doctorID);
  const {
    match: { params },
  } = props;
  var [inputFields, setInputFields] = useState([
    { medName: "", medDosage: "", medDescription: "" },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      medName: "",
      medDosage: "",
      medDescription: "",
    });
    setInputFields(values);
  };
  console.log("params in add Prescription", params);

  // console.log("props in add Prescription", props);
  const handleRemoveFields = (index) => {
    if (inputFields.length > 1) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "medName") {
      values[index].medName = event.target.value;
    } else if (event.target.name === "medDosage") {
      values[index].medDosage = event.target.value;
    } else if (event.target.name === "medDescription") {
      values[index].medDescription = event.target.value;
    }

    setInputFields(values);
  };
  console.log("user ID Params", params);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
    const newPrescription = {
      userID: params.userID,
      doctorID: params.doctorID,
      prescription: inputFields,
    };
    await Axios.post("/AddPrescription/registerPrescription/:id", {
      params: {
        userID: params.id,
      },
      newPrescription,
    }).then(async (res) => {
      console.log("res Message", res.data.message);
    });
  };

  // useEffect(() => {}, []);
  return (
    <>
      <h1>Add Prescripton</h1>

      <form onSubmit={handleSubmit} Validate>
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-2">
                {/* <label htmlFor="medType">Medicine Type</label> */}
                {/* <select class="form-control" id="sel1">
                  <option>Tablet</option>
                  <option>Syrup</option>
                  <option>Capsule</option>
                </select> */}
                {/* <input
                  required
                  type="text"
                  className="form-control"
                  id="medType"
                  name="medType"
                  value={inputField.medType}
                  onChange={(event) => handleInputChange(index, event)}
                /> */}
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="medName">Medicine Name</label>
                <input
                  style={{ marginTop: "0.55rem" }}
                  required
                  type="text"
                  className="form-control"
                  id="medName"
                  name="medName"
                  value={inputField.medName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="medDosage">Medicine Dosage</label>
                <input
                  style={{ marginTop: "0.55rem" }}
                  required
                  type="text"
                  className="form-control"
                  id="medDosage"
                  name="medDosage"
                  value={inputField.medDosage}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="medDescription">Medicine Description</label>
                {/* <input
                  required
                  type="text"
                  className="form-control"
                  id="medDescription"
                  name="medDescription"
                  value={inputField.medDescription}
                  onChange={(event) => handleInputChange(index, event)}
                /> */}

                {/* <label for="exampleFormControlTextarea1">
                  Example textarea
                </label> */}
                <textarea
                  style={{ resize: "none" }}
                  class="form-control"
                  id="medDescription"
                  name="medDescription"
                  rows="2"
                  onChange={(event) => handleInputChange(index, event)}
                ></textarea>
              </div>
              <div className=" col-sm-2">
                <button
                  style={{
                    borderRadius: "15px",
                    width: "max-content",
                    marginTop: "1.9rem",
                    padding: "0.5rem",
                  }}
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  Remove
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <div style={{ textAlign: "center" }} className="row">
          <div className="col-sm-6">
            <div className="submit-button">
              <button
                style={{ width: "15%", borderRadius: "15px" }}
                className="mr-2"
                type="submit"
                onSubmit={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
          <div className="col-sm-6">
            <button
              style={{
                borderRadius: "15px",
                width: "15%",

                padding: "0.2rem",
              }}
              type="button"
              onClick={() => handleAddFields()}
            >
              +
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddPrescriptionNew;
