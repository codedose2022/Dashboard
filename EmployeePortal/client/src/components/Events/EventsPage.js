import React, { useState, useEffect, useRef } from "react";
import useStyles from "./EventPageStyles";
import {
  Paper,
  Chip,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import wall from "../../images/wall.jpg";
import LikeDislikeCommentComponent from "./LikeDislikeCommentComponent";
import AddIcon from "@material-ui/icons/Add";
import { useMediaQuery, Button, Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import _ from "lodash";
import AddEvents from "./AddEvents";
import DeleteEvent from "./DeleteEvent";

import * as helper from "../../helper";

export default function EventsPage() {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const state = useSelector((state) => state);
  let events = _.get(state, "events.events", []);
  const isEventsMember = helper.isEventMember(
    _.get(state, "employees.employee.userData.division", "")
  );
  const [editButton, setEdit] = useState({ index: {} });
  const [deleteButton, setDelete] = useState({ index: {} });
  const [open, setOpenModel] = useState(false);

  function setEditButton(index) {
    setEdit({
      index: {
        [index]: true,
      },
    });
  }

  function setDeleteButton(index) {
    setDelete({
      index: {
        [index]: true,
      },
    });
  }

  const handleAddEventModelOpen = () => {
    setOpenModel(true);
  };

  return (
    <div className={classes.root}>
      <Grid container justify='flex-end'>
        {isEventsMember && (
          <Button
            id='Add-events-button'
            key='Add-events-button_'
            className={classes.addButtonStyle}
            color='primary'
            justify='flex-end'
            variant={isSmallScreen ? "text" : "contained"}
            size='small'
            onClick={handleAddEventModelOpen}
            startIcon={<AddIcon className={classes.tableCellStyle} />}
          >
            Add events
          </Button>
        )}
        {open && <AddEvents setOpenModel={setOpenModel} />}
      </Grid>
      {events.map((event, eventIndex) => {
        return (
          <Paper
            className={classes.paper}
            variant='outlined'
            key={`event${event._id}`}
          >
            <Grid className={classes.header}>
              <Chip
                className={classes.chip}
                key={`status_${event._id}`}
                size='small'
                label={event.status}
                color={event.status === "Approved" ? "primary" : "secondary"}
              />
              {isEventsMember && (
                <span>
                  <Tooltip title='Edit'>
                    <IconButton
                      style={{ background: "none", padding: "0px" }}
                      key={`iconEditButton${event._id}`}
                      className={classes.iconVertical}
                      onClick={() => setEditButton(eventIndex)}
                    >
                      <EditIcon color='primary' size='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete'>
                    <IconButton
                      style={{ background: "none" }}
                      key={`iconDeleteButton${event._id}`}
                      className={classes.iconVertical}
                      onClick={() => setDeleteButton(eventIndex)}
                    >
                      <DeleteIcon color='primary' size='small' />
                    </IconButton>
                  </Tooltip>
                </span>
              )}
            </Grid>

            {_.get(editButton, `index.${eventIndex}`, false) && (
              <AddEvents setEdit={setEdit} event={event} />
            )}
            {_.get(deleteButton, `index.${eventIndex}`, false) && (
              <DeleteEvent setDelete={setDelete} event={event} />
            )}

            <div>
              <Typography
                key={`title${event._id}`}
                className={classes.marginStyle}
                style = {{color:'darkgreen',fontWeight:'600'}}
              >
                {event.title}
              </Typography>
              <div style={{ width: "100%" }}>
                <Box display='flex' p={1} className={classes.box}>
                  <Box p={1} key={`date${event._id}`}>
                    {event.date && event.date.substring(0, 10)}
                  </Box>
                  <Box p={1} key={`time${event._id}`}>
                    {event.time}
                  </Box>
                  <Box p={1} key={`venue${event._id}`}>
                    {event.venue}
                  </Box>
                </Box>

                <div className={classes.marginStyle}>
                  <img
                    key={`img${event._id}`}
                    className={classes.img}
                    alt='Contemplative Reptile'
                    src={wall}
                    title='Contemplative Reptile'
                  />
                </div>
                <div style={{ margin: "12px",wordWrap: "break-word" }}>
                  <Typography variant='caption' key={`desc${event._id}`} className = {classes.box}>
                    {event.desc}
                  </Typography>
                </div>
                <LikeDislikeCommentComponent />
              </div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}
