import {
  Card,
  createMuiTheme,
  Grid,
  responsiveFontSizes,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./MyProfileStyles";

function ProfileHeader(props) {
  const classes = useStyles();
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  return (
    <>
      <Card>
        <Grid container className={classes.profileCard}>
          <Grid item lg={6}>
            <img
              alt={props.profileData.selectedFile}
              src={
                props.profileData.selectedFile
                  ? `http://localhost:5000/${props.profileData.selectedFile}`
                  : ""
              }
              className={classes.image}
            />
          </Grid>
          <Grid item lg={6}>
            <Typography variant="h6" className={classes.typography}>
              {props.profileData.firstName + " " + props.profileData.lastName}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={classes.typography1}
            >
              {props.profileData.employeeCode}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={classes.typography1}
            >
              {props.profileData.designation} | {props.profileData.department}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default ProfileHeader;
