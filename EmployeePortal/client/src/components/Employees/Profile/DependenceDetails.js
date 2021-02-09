import { Grid, Paper, TextField } from "@material-ui/core";
import moment from "moment";
import React from "react";
import Heading from "../Heading";
import useStyles from "./MyProfileStyles";

function DependenceDetails(props) {
  const classes = useStyles();
  return (
    <Grid item sm={12}>
      {props.profileData.dependenceDetails &&
        props.profileData.dependenceDetails[0].dependenceName !== "" && (
          <Paper className={classes.paper} elevation={5}>
            <Heading text="Dependence Details" />
            {props.profileData.dependenceDetails
              ? props.profileData.dependenceDetails.map((dependence, index) => (
                  <div key={index}>
                    <TextField
                      className={classes.div}
                      size="small"
                      id="dependenceName"
                      label="Name"
                      defaultValue={dependence ? dependence.dependenceName : ""}
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                      variant="filled"
                    />

                    <TextField
                      className={classes.div}
                      size="small"
                      id="dependenceRelationship"
                      label="Relationship"
                      defaultValue={
                        dependence ? dependence.dependenceRelationship : ""
                      }
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                      variant="filled"
                    />

                    <TextField
                      className={classes.div}
                      size="small"
                      id="dependenceDob"
                      label="Date of Birth"
                      defaultValue={
                        dependence
                          ? moment(dependence.dependenceDob).format(
                              "Do MMMM YYYY"
                            )
                          : ""
                      }
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                      variant="filled"
                    />
                  </div>
                ))
              : ""}
          </Paper>
        )}
    </Grid>
  );
}

export default DependenceDetails;
