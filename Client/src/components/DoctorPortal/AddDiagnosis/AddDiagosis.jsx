import React, { useState, Fragment } from "react";
import Axios from "axios";

const AddDiagosis = (props) => {
  const {
    match: { params },
  } = props;
  var [inputFields, setInputFields] = useState([
    { diseaseName: "", diseaseDescription: "" },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      diseaseName: "",
      diseaseDescription: "",
    });
    setInputFields(values);
  };
  console.log("params in add Diagnosis", params);

  const handleRemoveFields = (index) => {
    if (inputFields.length > 1) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "diseaseName") {
      values[index].diseaseName = event.target.value;
    } else if (event.target.name === "diseaseDescription") {
      values[index].diseaseDescription = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDiagnosis = {
      userID: params.userID,
      doctorID: params.doctorID,
      diagnosis: inputFields,
    };
    console.log("new Diagnosis", newDiagnosis);
    await Axios.post("/AddDiagnosis/registerDiagnosis/:id", {
      params: {
        userID: params.id,
      },
      newDiagnosis,
    }).then(async (res) => {
      console.log("res Message", res.data.message);
    });
  };

  // useEffect(() => {}, []);
  return (
    <>
      <h1>Add Diagnosis</h1>

      <form onSubmit={handleSubmit} Validate>
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-2"></div>
              <div className="form-group col-sm-2">
                <label htmlFor="diseaseName">Disease Name</label>
                <input
                  style={{ marginTop: "0.55rem" }}
                  required
                  type="text"
                  className="form-control"
                  id="diseaseName"
                  name="diseaseName"
                  value={inputField.diseaseName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-4">
                <label htmlFor="diseaseDescription">Disease Description</label>
                <textarea
                  style={{ resize: "none" }}
                  class="form-control"
                  id="diseaseDescription"
                  name="diseaseDescription"
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
              <div className="form-group col-sm-2"></div>
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
export default AddDiagosis;
