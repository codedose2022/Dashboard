import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Heading from "../Heading";
import useStyles from "./MyProfileStyles";
import Textfield from "./Textfield";

function WorkDetails(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
    
        <Grid container spacing={1}>
          <Heading text="Work Details" />
        </Grid>
        <Grid container spacing={1}>
          <Textfield
            id="designation"
            label="Designation"
            employee={props.employee}
          />

          <Textfield
            id="department"
            label="Department"
            employee={props.employee}
          />

          <Textfield
            id="dateOfHire"
            label="Date of Joining"
            employee={props.employee}
          />

          <Textfield
            id="deskPhone"
            label="Desk Phone"
            employee={props.employee}
          />

          <Textfield
            id="workMobile"
            label="Work Mobile"
            employee={props.employee}
          />

          <Textfield
            id="nationality"
            label="Nationality"
            employee={props.employee}
          />
        </Grid>
      
    </Grid>
  );
}

export default WorkDetails;
