import { Grid } from "@material-ui/core";
import React from "react";
import FileBase from "react-file-base64";
import Heading from "../Heading";
import useStyles from "./AddEmployeeStyles";

function AddProfilePhoto(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Heading text="Add Profile Photo" />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <FileBase
          className={classes.fileInput}
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            props.setAddEmployee({ ...props.addEmployee, selectedFile: base64 })
          }
        />
      </Grid>
    </Grid>
  );
}

export default AddProfilePhoto;
