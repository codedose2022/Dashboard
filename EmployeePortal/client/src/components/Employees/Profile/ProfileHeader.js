import {
  Avatar,
  Container,
  createMuiTheme,
  Grid,
  MuiThemeProvider,

  responsiveFontSizes,
  Typography
} from "@material-ui/core";
import React from "react";
import useStyles from "./MyProfileStyles";

function ProfileHeader(props) {
  const classes = useStyles();
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  return (
    <Grid item xs={12} container>
      <Grid item xs={12}>
       
          <Container className={classes.container}>
            <Avatar
              src={props.profileData.selectedFile}
              className={classes.image}
            />
            <MuiThemeProvider theme={theme}>
              <Grid>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography variant="h6" className={classes.typography}>
                      {props.profileData.firstName +
                        " " +
                        props.profileData.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      className={classes.typography1}
                    >
                      {props.profileData.employeeCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      className={classes.typography1}
                    >
                      {props.profileData.designation}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      className={classes.typography1}
                    >
                      {props.profileData.department}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </Container>
        
      </Grid>
    </Grid>
  );
}

export default ProfileHeader;
