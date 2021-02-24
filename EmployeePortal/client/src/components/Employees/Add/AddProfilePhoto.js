import { Grid } from "@material-ui/core";
import React from "react";
import Heading from "../Heading";
import useStyles from "./AddEmployeeStyles";

function AddProfilePhoto(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Heading text="Add Profile Photo" />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <input
          className={classes.fileInput}
          type="file"
          onChange={(e) =>
            props.setAddEmployee({
              ...props.addEmployee,
              selectedFile: e.target.files[0],
            })
          }
        />
      </Grid>
    </Grid>
  );
}

export default AddProfilePhoto;
