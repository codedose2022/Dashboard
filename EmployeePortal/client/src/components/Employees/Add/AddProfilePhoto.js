import { Grid } from "@material-ui/core";
import React from "react";
import Heading from "../Heading";
import useStyles from "./AddEmployeeStyles";

function AddProfilePhoto(props) {
  const classes = useStyles();
  let displayName =
    typeof props.addEmployee.selectedFile === "string"
      ? props.addEmployee.selectedFile
      : props.addEmployee.selectedFile.name;
  return (
    <Grid container spacing={2}>
      <Heading text="Add Profile Photo" />
      <Grid item xs={12} >
        <input
          style={{ color: "transparent" }}
          accept="image/x-png,image/jpeg,image/png,image/jpg,image/jfif"
          className={classes.fileInput}
          type="file"
          onChange={(e) =>
            props.setAddEmployee({
              ...props.addEmployee,
              selectedFile: e.target.files.length > 0 ? e.target.files[0] : "",
            })
          }
        />
        <div style={{ color: "black" }}>{displayName}</div>
      </Grid>
    </Grid>
  );
}

export default AddProfilePhoto;
