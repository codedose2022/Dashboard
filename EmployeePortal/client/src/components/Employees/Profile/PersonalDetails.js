import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Heading from "../Heading";
import useStyles from "./MyProfileStyles";
import Textfield from "./Textfield";

function PersonalDetails(props) {
  const classes = useStyles();
  return (
    <Grid item sm={12}>
     
        <Grid container spacing={1}>
          <Heading text="Personal Details" />
        </Grid>
        <Grid container spacing={1}>
          <Textfield
            id="phoneNumber"
            label="Phone Number"
            employee={props.employee}
          />

          <Textfield id="dob" label="Date of Birth" employee={props.employee} />

          <Textfield
            id="dietPath"
            label="Diet Path"
            employee={props.employee}
          />

          <Textfield id="gender" label="Gender" employee={props.employee} />

          <Textfield
            id="maritalStatus"
            label="Marital Status"
            employee={props.employee}
          />

          <Textfield id="hobbies" label="Hobbies" employee={props.employee} />
        </Grid>
      
    </Grid>
  );
}

export default PersonalDetails;
