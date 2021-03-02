import { Card, Grid, Typography } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Dashboard/Navbar";
import useStyles from "./UserProfileStyles";
import user_icon from "../../../images/user_icon.svg";

export default function MyProfile(props) {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const employeeProfile = _.get(state, "employees.profile", "");
  const profileData = props.employee ? props.employee : employeeProfile;
  return (
    <>
      {!props.employee && <Navbar />}
      {profileData ? (
        <>
          {!props.employee && (
            <Grid
              item
              style={{
                paddingTop: "3rem",
                paddingRight: "2rem",
                textAlign: "end",
              }}
            >
              <Link style={{ textDecoration: "none", color: "teal" }} to="/">
                <h6 className={classes.linkStyle}>GO TO DASHBOARD</h6>
              </Link>
            </Grid>
          )}
          <Grid container style={{ padding: "2rem" }}>
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={2}
              className={classes.profileGrid}
            >
              <div className={classes.profileAvatar}>
                <img
                  width="100%"
                  alt={profileData.selectedFile}
                  src={
                    profileData.selectedFile
                      ? `http://localhost:5000/${profileData.selectedFile}`
                      : user_icon
                  }
                />
              </div>
              <Card className={classes.profileCard}>
                <Typography variant="h6" component="h6">
                  {profileData.firstName + " " + profileData.lastName}
                </Typography>
                <Typography variant="body1">
                  {profileData.employeeCode}
                </Typography>
                <Typography variant="body1">
                  {profileData.designation} | {profileData.department}
                </Typography>
              </Card>
            </Grid>
            <Grid
              item
              lg={8}
              sm={12}
              xs={12}
              md={10}
              className={classes.profileInfoGrid}
            >
              <Card className={classes.profileInfoCard}>
                <Typography variant="h6" component="h6">
                  Basic Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      First Name: {profileData.firstName}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Last Name:
                      {profileData.lastName}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Email:
                      {profileData.email}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      EmployeeCode:
                      {profileData.employeeCode}
                    </Typography>
                  </Grid>
                </Grid>
                <hr />
                <Typography variant="h6" component="h6">
                  Work Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Designation: {profileData.designation}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Department:
                      {profileData.department}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Date of Joining:
                      {moment(profileData.dateOfHire).format("Do MMMM YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Desk Phone:
                      {profileData.deskPhone}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Work Mobile:
                      {profileData.workMobile}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Nationality:
                      {profileData.nationality}
                    </Typography>
                  </Grid>
                </Grid>
                <hr />
                <Typography variant="h6" component="h6">
                  Personal Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Mobile Number: {profileData.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Date of Birth:{" "}
                      {moment(profileData.dob).format("Do MMMM YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Diet Path: {profileData.dietPath}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Gender: {profileData.gender}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Marital Status: {profileData.maritalStatus}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Typography variant="body2">
                      Hobbies: {profileData.hobbies}
                    </Typography>
                  </Grid>
                </Grid>
                <hr />

                {profileData.dependenceDetails &&
                  profileData.dependenceDetails[0].dependenceName !== "" && (
                    <>
                      <Typography variant="h6" component="h6">
                        Dependence Details
                      </Typography>
                      {profileData.dependenceDetails
                        ? profileData.dependenceDetails.map(
                            (dependence, index) => (
                              <div key={index}>
                                <Grid container spacing={1}>
                                  <Grid item lg={4} md={6} sm={12}>
                                    <Typography variant="body2">
                                      Dependence Name:{" "}
                                      {dependence
                                        ? dependence.dependenceName
                                        : ""}
                                    </Typography>
                                  </Grid>
                                  <Grid item lg={4} md={6} sm={12}>
                                    <Typography variant="body2">
                                      Relationship:
                                      {dependence
                                        ? dependence.dependenceRelationship
                                        : ""}
                                    </Typography>
                                  </Grid>
                                  <Grid item lg={4} md={6} sm={12}>
                                    <Typography variant="body2">
                                      Date of Birth:
                                      {dependence
                                        ? moment(
                                            dependence.dependenceDob
                                          ).format("Do MMMM YYYY")
                                        : ""}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </div>
                            )
                          )
                        : ""}
                    </>
                  )}
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        "loading"
      )}
    </>
  );
}
