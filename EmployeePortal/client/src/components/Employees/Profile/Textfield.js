import { Grid, TextField } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
function Textfield(props) {
  const state = useSelector((state) => state);
  const employeeProfile = _.get(state, "employees.profile", "");
  const profileData = props.employee ? props.employee : employeeProfile;

  function getValue(field) {
    if (field === "dateOfHire" || field === "dob") {
      return moment(profileData.field).format("Do MMMM YYYY");
    } else {
      const value = _.get(profileData, field, "");
      if (value) {
        return value;
      }
    }
  }

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <TextField
        size="small"
        fullWidth
        id={props.id}
        label={props.label}
        InputProps={{
          readOnly: true,
          disableUnderline: true,
        }}
        value={getValue(props.id)}
      />
    </Grid>
  );
}

export default Textfield;
