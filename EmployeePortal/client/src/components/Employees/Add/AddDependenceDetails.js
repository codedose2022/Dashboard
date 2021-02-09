import { Grid, IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import Heading from "../Heading";
import useStyles from "./AddEmployeeStyles";
import moment from 'moment';

function AddDependenceDetails(props) {

  const classes = useStyles();
  const handleChangeInput = (index, e) => {
    const values = [...props.dependence];
    values[index][e.target.name] = e.target.value;
    props.setDependence(values);
  };
  const handleAddFields = () => {
    props.setDependence([
      ...props.dependence,
      { dependenceName: "", dependenceRelationship: "", dependenceDob: "" },
    ]);
  };
  const handleRemoveFields = (index) => {
    const values = [...props.dependence];
    values.splice(index, 1);
    props.setDependence(values);
  };

  return (
    <Grid container spacing={1}>
      <Heading text="Dependence Details" />

      {props.dependence.map((d, index) => (
        <div key={index}>
          <TextField
            className={classes.div}
            id="dependenceName"
            name="dependenceName"
            label="Name"
            variant="outlined"
            size="small"
            disabled={props.disableProfile.disableInd}
            value={d.dependenceName}
            onChange={(e) => handleChangeInput(index, e)}
          />
          <TextField
            className={classes.div}
            id="dependenceRelationship"
            name="dependenceRelationship"
            label="Relationship"
            variant="outlined"
            size="small"
            disabled={props.disableProfile.disableInd}
            value={d.dependenceRelationship}
            onChange={(e) => handleChangeInput(index, e)}
          />
          <TextField
            className={classes.div}
            id="dependenceDob"
            name="dependenceDob"
            label="Date of Birth"
            variant="outlined"
            type="date"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: `${moment().format("YYYY-MM-DD").toString()}`,
            }}
            disabled={props.disableProfile.disableInd}
            value={d.dependenceDob}
            onChange={(e) => handleChangeInput(index, e)}
          />
          <IconButton
            disabled={index === 0}
            onClick={() => handleRemoveFields(index)}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={() => handleAddFields()}>
            <AddIcon />
          </IconButton>
        </div>
      ))}
    </Grid>
  );
}

export default AddDependenceDetails;
