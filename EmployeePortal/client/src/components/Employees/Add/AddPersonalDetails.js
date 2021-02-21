import { Grid, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import Heading from "../Heading";
import useStyles from "./AddEmployeeStyles";
import moment from 'moment';

function AddPersonalDetails(props) {
  const onChangeFields = (e) => {
    props.setAddEmployee({
      ...props.addEmployee,
      [e.target.name]: e.target.value,
    });
    props.validate({ [e.target.name]: e.target.value });
  };
  return (
    <Grid container spacing={2}>
      <Heading text="Personal Details" />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="gender"
          name="gender"
          label="Gender"
          size="small"
          disabled={props.disableProfile.disableInd}
          error={props.errors.gender ? true : false}
          helperText={props.errors.gender}
          value={props.addEmployee.gender}
          onChange={(e) => onChangeFields(e)}
          variant="outlined"
          select
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="maritalStatus"
          name="maritalStatus"
          size="small"
          disabled={props.disableProfile.disableInd}
          label="Marital Status"
          error={props.errors.maritalStatus ? true : false}
          helperText={props.errors.maritalStatus}
          value={props.addEmployee.maritalStatus}
          onChange={(e) => onChangeFields(e)}
          variant="outlined"
          select
        >
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Single">Single</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="phoneNumber"
          name="phoneNumber"
          label="Personal Mobile Number"
          size="small"
          variant="outlined"
          type="number"
          error={props.errors.phoneNumber ? true : false}
          helperText={props.errors.phoneNumber}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.phoneNumber}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="dob"
          name="dob"
          type="date"
          label="Date of Birth"
          variant="outlined"
          size="small"
          error={props.errors.dob ? true : false}
          helperText={props.errors.dob}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.dob}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            max: `${moment().format("YYYY-MM-DD").toString()}`,
          }}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          id="hobbies"
          name="hobbies"
          label="Hobbies"
          variant="outlined"
          size="small"
          error={props.errors.hobbies ? true : false}
          helperText={props.errors.hobbies}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.hobbies}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          id="dietPath"
          name="dietPath"
          label="Diet Path"
          size="small"
          disabled={props.disableProfile.disableInd}
          error={props.errors.dietPath ? true : false}
          helperText={props.errors.dietPath}
          value={props.addEmployee.dietPath}
          onChange={(e) => onChangeFields(e)}
          variant="outlined"
          select
        >
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
          <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
}

export default AddPersonalDetails;
