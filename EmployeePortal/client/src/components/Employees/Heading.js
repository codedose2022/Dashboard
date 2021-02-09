import { Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';

function Heading(props) {
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1">{props.text}</Typography>
      <Divider />
    </Grid>
  );
}

export default Heading;
