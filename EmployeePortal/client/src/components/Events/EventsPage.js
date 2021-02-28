import {
  Box,
  Button,
  Chip,
  Grid,
  Hidden,
  IconButton,
  Paper,



  Snackbar, Tooltip,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../actions/events";
import * as api from "../../api";
import * as helper from "../../helper";
import AddEvents from "./AddEvents";
import CommentList from "./CommentList";
import CommentsComponent from "./CommentsComponent";
import DeleteEvent from "./DeleteEvent";
import useStyles from "./EventPageStyles";
import LikeDislikeCommentComponent from "./LikeDislikeCommentComponent";
import ViewMoreComponent from "./ViewMoreComponent";

export default function EventsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const state = useSelector((state) => state);
  const userData = _.get(state, "employees.employee.userData", "");
  let events = _.get(state, "events.events", []);
  const isEventsMember = helper.isEventMember(
    _.get(state, "employees.employee.userData.division", "")
  );
  const isSuperAdmin = helper.isSuperAdmin(
    _.get(state, "employees.employee.userData.division", "")
  );
  let token = localStorage.getItem("auth-token");
  const [editButton, setEdit] = useState({ index: {} });
  const [deleteButton, setDelete] = useState({ index: {} });
  const [open, setOpenModel] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [displaySnackbarText, setDisplaySnackbarText] = useState("");
  function setEditButton(index) {
    setEdit({
      index: {
        [index]: true,
      },
    });
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

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

  const approveEvent = async (event, eventIndex) => {
    try {
      const response = await api.approval(token, {
        status: "Approved",
        _id: event._id,
      });
      const responseData = _.get(response, "data.responseData", "");
      if (responseData.messages.status === "21") {
        dispatch(getEvents(token, userData.division));
      }
    } catch (error) {}
  };

  const disApproveEvent = async (event, eventIndex) => {
    try {
      const response = await api.approval(token, {
        status: "Disapproved",
        _id: event._id,
      });
      const responseData = _.get(response, "data.responseData", "");
      if (responseData.messages.status === "21") {
        dispatch(getEvents(token, userData.division));
      }
    } catch (error) {}
  };

  return (
    <div className={classes.cardGrid}>
      <Grid container justify="flex-end">
        {isEventsMember && (
          <Button
            id="Add-events-button"
            key="Add-events-button_"
            className={classes.addButtonStyle}
            color="primary"
            justify="flex-end"
            variant={isSmallScreen ? "text" : "contained"}
            size="small"
            onClick={handleAddEventModelOpen}
            startIcon={<AddIcon className={classes.tableCellStyle} />}
          >
            Add events
          </Button>
        )}
        {open && (
          <AddEvents
            setOpenModel={setOpenModel}
            userData={userData}
            setShowSnackbar={setShowSnackbar}
            setDisplaySnackbarText={setDisplaySnackbarText}
          />
        )}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            style={{ width: "300px", color: "white", background: "#1b5e20" }}
            severity="success"
          >
            {displaySnackbarText}
          </Alert>
        </Snackbar>
      </Grid>
      {events.map((event, eventIndex) => {
        return (
          <Paper
            className={classes.paper}
            elevation={9}
            key={`event${event._id}`}
          >
            {moment(`${event.date.substring(0, 10)} ${event.time}`).isAfter(
              moment()
            ) ? (
              <Grid container className={classes.header}>
                <Grid item lg={8}>
                  {
                    <Chip
                      className={classes.chip}
                      key={`status_${event._id}`}
                      size="small"
                      label={
                        event.status === "Approved" ? "Upcoming" : event.status
                      }
                      style={
                        event.status === "Approved"
                          ? { background: "#1b5e20", color: "white" }
                          : { background: "#D9512C", color: "white" }
                      }
                    />
                  }
                </Grid>
                <Grid item lg={4} className={classes.cardBtnPanelTop}>
                  {isEventsMember && (
                    <>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          key={`iconEditButton${event._id}`}
                          className={classes.iconVertical}
                          onClick={() => setEditButton(eventIndex)}
                        >
                          <EditIcon color="primary" size="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          key={`iconDeleteButton${event._id}`}
                          className={classes.iconVertical}
                          onClick={() => setDeleteButton(eventIndex)}
                        >
                          <DeleteIcon color="primary" size="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  {isSuperAdmin &&
                    ["pending", "Disapproved"].includes(event.status) && (
                      <>
                        {["pending", "Disapproved"].includes(event.status) && (
                          <Chip
                            size="small"
                            label="Approve"
                            clickable
                            color="primary"
                            onDelete={() => approveEvent(event, eventIndex)}
                            deleteIcon={<DoneIcon />}
                            variant="outlined"
                            style={{ border: "1px solid #DCDCDC" }}
                          />
                        )}
                        &nbsp;
                        {["pending", "Approved"].includes(event.status) && (
                          <Chip
                            size="small"
                            clickable
                            label="Disapprove"
                            onDelete={() => disApproveEvent(event, eventIndex)}
                            color="secondary"
                            variant="outlined"
                            style={{ border: "1px solid #DCDCDC" }}
                          />
                        )}
                      </>
                    )}
                </Grid>
              </Grid>
            ) : (
              <div className={classes.topPaddingStyle}></div>
            )}

            {_.get(editButton, `index.${eventIndex}`, false) && (
              <AddEvents
                setEdit={setEdit}
                event={event}
                userData={userData}
                setShowSnackbar={setShowSnackbar}
                setDisplaySnackbarText={setDisplaySnackbarText}
              />
            )}
            {_.get(deleteButton, `index.${eventIndex}`, false) && (
              <DeleteEvent
                setDelete={setDelete}
                event={event}
                userData={userData}
                setShowSnackbar={setShowSnackbar}
                setDisplaySnackbarText={setDisplaySnackbarText}
              />
            )}

            <div>
              <Typography
                key={`title${event._id}`}
                className={classes.marginStyle}
                variant="h6"
                color="primary"
                style={{
                  wordWrap: "break-word",
                }}
              >
                {event.title.toUpperCase()}
              </Typography>

              <div>
                <Box p={1} key={`date${event._id}`} className={classes.box}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Box p={1} key={`date${event._id}`}>
                        {event.date && (
                          <span>
                            <Hidden smDown>
                              <span variant="subtitle2">Date : </span>
                            </Hidden>
                            {moment(event.date).format("MMMM Do YYYY")}
                          </span>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box
                        p={1}
                        key={`time${event._id}`}
                        style={{ textAlign: "center" }}
                      >
                        <span>
                          <Hidden smDown>
                            <span variant="subtitle2">Time : </span>
                          </Hidden>
                          {moment(event.time, "hh:mm").format("LT")}
                        </span>
                      </Box>
                    </Grid>

                    <Grid item xs={4}>
                      <Box
                        p={1}
                        key={`venue${event._id}`}
                        style={{ textAlign: "end" }}
                      >
                        <span>
                          <Hidden smDown>
                            <span variant="subtitle2">Venue : </span>
                          </Hidden>
                          {event.venue}
                        </span>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <img
                  alt={event.title}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                  src={`http://localhost:5000/${event.img}`}
                ></img>

                <div style={{ margin: "12px", wordWrap: "break-word" }}>
                  <Typography
                    variant="caption"
                    key={`desc${event._id}`}
                    className={classes.desc}
                  >
                    <ViewMoreComponent text={event.desc} id={event._id} />
                  </Typography>
                </div>
                <Box className={classes.alignment}>
                  Posted on{" "}
                  {`${moment(event.createdAt).format("Do MMMM YYYY")}, ${moment(
                    event.createdAt
                  ).format("h:mm a")}`}
                </Box>
              </div>
            </div>
            {event.status === "Approved" && (
              <div>
                <LikeDislikeCommentComponent
                  event={event}
                  userData={userData}
                />
                <CommentsComponent
                  userData={userData}
                  token={token}
                  event={event}
                />
                <CommentList
                  userData={userData}
                  commentsList={event.comments}
                  event={event}
                />
              </div>
            )}
            <div style={{ paddingBottom: "12px" }}></div>
          </Paper>
        );
      })}
    </div>
  );
}
