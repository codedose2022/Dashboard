import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { CountryDropdown } from "react-country-region-selector";
import Heading from "../Heading";
import useStyles from "./AddEmployeeStyles";

function AddBasicInfo(props) {
  const classes = useStyles();
  const onChangeFields = (e) => {
    props.setAddEmployee({
      ...props.addEmployee,
      [e.target.name]: e.target.value,
    });
    props.validate({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Heading text="Employee Details" />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
          size="small"
          error={props.errors.firstName ? true : false}
          helperText={props.errors.firstName}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.firstName}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="outlined"
          size="small"
          error={props.errors.lastName ? true : false}
          helperText={props.errors.lastName}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.lastName}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          error={props.errors.email ? true : false}
          helperText={props.errors.email}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.email}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="employeeCode"
          name="employeeCode"
          label="Employee Code"
          variant="outlined"
          size="small"
          error={props.errors.employeeCode ? true : false}
          helperText={props.errors.employeeCode}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.employeeCode}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <CountryDropdown
          style={{ borderStyle: "revert", borderColor: "darkgrey" }}
          defaultOptionLabel="Select Nationality"
          required
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.nationality}
          whitelist={["IN", "AE", "PH"]}
          onChange={(e) =>
            props.setAddEmployee({ ...props.addEmployee, nationality: e })
          }
          className={classes.country}
        />
        <div style={{ color: "red" }}>{props.errors.nationality}</div>
      </Grid>
    </Grid>
  );
}

export default AddBasicInfo;
