import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Heading from "../Heading";
import useStyles from "./MyProfileStyles";
import Textfield from "./Textfield";

function BasicInfo(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
     
        <Grid container spacing={1}>
          <Heading text="Basic Info" />
        </Grid>
        <Grid container spacing={1}>
          <Textfield
            id="firstName"
            label="First Name"
            employee={props.employee}
          />

          <Textfield
            id="lastName"
            label="Last Name"
            employee={props.employee}
          />

          <Textfield id="email" label="Email" employee={props.employee} />

          <Textfield
            id="employeeCode"
            label="Employee Code"
            employee={props.employee}
          />
        </Grid>
      
    </Grid>
  );
}

export default BasicInfo;
