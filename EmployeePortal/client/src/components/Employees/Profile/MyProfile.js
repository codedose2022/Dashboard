import { Container, Grid } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Dashboard/Navbar";
import BasicInfo from "./BasicInfo";
import DependenceDetails from "./DependenceDetails";
import useStyles from "./MyProfileStyles";
import PersonalDetails from "./PersonalDetails";
import ProfileHeader from "./ProfileHeader";
import WorkDetails from "./WorkDetails";

export default function MyProfile(props) {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const employeeProfile = _.get(state, "employees.profile", "");
  const profileData = props.employee ? props.employee : employeeProfile;

  return (
    <div>
      {!props.employee && <Navbar />}
      {profileData ? (
        <div>
          {!props.employee && (
            <div>
              <Link style={{ textDecoration: "none" }} to="/Dashboard">
                <h6 className={classes.linkStyle}>GO TO DASHBOARD</h6>
              </Link>
            </div>
          )}
          <Container fixed fullwidth="true" maxWidth="md">
            <Grid>
              <Grid container spacing={1}>
                <ProfileHeader profileData={profileData} />
                <BasicInfo employee={props.employee} />
                <WorkDetails employee={props.employee} />
                <PersonalDetails employee={props.employee} />
                <DependenceDetails profileData={profileData} />
              </Grid>
            </Grid>
          </Container>{" "}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
