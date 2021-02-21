import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { departments } from "../Constants/departmentList";
import Heading from "../Heading";
import useStyles from "./AddEmployeeStyles";

function AddWorkDetails(props) {
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
      <Heading text="Work Details" />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <FormControl
          variant="outlined"
          fullWidth
          size="small"
          className={classes.formControl}
          error={props.errors.department ? true : false}
        >
          <InputLabel required id="department">
            Department
          </InputLabel>
          <Select
            fullWidth
            disabled={props.disableProfile.disableInd}
            label="department"
            id="department"
            name="department"
            value={props.addEmployee.department}
            onChange={(e) => onChangeFields(e)}
          >
            <MenuItem value="">Select</MenuItem>
            {departments.map((department) => (
              <MenuItem
                value={department.departmentName}
                key={department.department}
              >
                {department.departmentName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{props.errors.department}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <FormControl
          variant="outlined"
          fullWidth
          size="small"
          className={classes.formControl}
          error={props.errors.designation ? true : false}
        >
          <InputLabel required id="designation">
            Designation
          </InputLabel>
          <Select
            fullWidth
            size="small"
            displayEmpty
            label="designation"
            id="designation"
            name="designation"
            value={props.addEmployee.designation}
            onChange={(e) => onChangeFields(e)}
            disabled={
              !props.addEmployee.department || props.disableProfile.disableInd
            }
          >
            {props.addEmployee.department
              ? departments
                  .find(
                    ({ departmentName }) =>
                      departmentName === props.addEmployee.department
                  )
                  .designationList.map((designation) => (
                    <MenuItem
                      value={designation.designationName}
                      key={designation.designation}
                    >
                      {designation.designationName}
                    </MenuItem>
                  ))
              : []}
          </Select>
          <FormHelperText>{props.errors.designation}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          id="division"
          size="small"
          required
          name="division"
          label="Division"
          error={props.errors.division ? true : false}
          helperText={props.errors.division}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.division}
          onChange={(e) => onChangeFields(e)}
          variant="outlined"
          select
        >
          <MenuItem value="EE">Events Committe</MenuItem>
          <MenuItem value="ED">Editorial Committe</MenuItem>
          <MenuItem value="EM">Employee</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="dateOfHire"
          size="small"
          type="date"
          name="dateOfHire"
          label="Date of Joining"
          error={props.errors.dateOfHire ? true : false}
          helperText={props.errors.dateOfHire}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.dateOfHire}
          variant="outlined"
          inputProps={{
            min: "2021-01-18",
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="deskPhone"
          name="deskPhone"
          label="Desk Phone"
          type="number"
          variant="outlined"
          size="small"
          error={props.errors.deskPhone ? true : false}
          helperText={props.errors.deskPhone}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.deskPhone}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TextField
          fullWidth
          required
          id="workMobile"
          name="workMobile"
          label="Work Mobile"
          type="number"
          variant="outlined"
          size="small"
          error={props.errors.workMobile ? true : false}
          helperText={props.errors.workMobile}
          disabled={props.disableProfile.disableInd}
          value={props.addEmployee.workMobile}
          onChange={(e) => onChangeFields(e)}
        />
      </Grid>
    </Grid>
  );
}

export default AddWorkDetails;
