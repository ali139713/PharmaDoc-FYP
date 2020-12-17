import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddPrescription() {
  const [medType, setMedType] = useState(null);
  const [medName, setMedName] = useState(null);
  const [medQuantity, setMedQuantity] = useState(null);
  const [medDescripton, setMedDescripton] = useState([]);
  const classes = useStyles();

  console.log("TYPE", medDescripton);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* <div className={classes.paper}> */}
      <form className={classes.form} Validate>
        <div className="row border border-dark rounded shadow-sm m-10 p-1">
          <Grid
            style={{
              marginTop: "0.7rem",
              marginLeft: "0.7rem",
              marginBottom: "0.7rem",
              marginRight: "0.7rem",
            }}
            container
            spacing={3}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="medType"
                name="medType"
                variant="outlined"
                required
                fullWidth
                id="medType"
                label="Medicine Type"
                autoFocus
                onChange={(e) => {
                  setMedType(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="medName"
                label="Medicine Name"
                name="medName"
                autoComplete="medName"
                onChange={(e) => {
                  setMedName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="medDosage"
                label="Medicine Dosage"
                name="medDosage"
                autoComplete="medDosage"
                onChange={(e) => {
                  setMedQuantity(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={1}
                placeholder="Description of Medicines"
                onChange={(e) => {
                  setMedDescripton(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Prescription
        </Button>
      </form>
      {/* </div> */}
      <Box mt={5}></Box>
    </Container>
  );
}
