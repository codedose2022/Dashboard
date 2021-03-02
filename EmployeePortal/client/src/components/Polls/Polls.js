import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  Snackbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api";
import * as helper from "../../helper";
import pollDefaultImage from "../../images/poll-24px.svg";
import AddPolls from "./AddPolls";
import DeletePolls from "./DeletePolls";
import useStyles from "./PollsStyles";

export default function Polls() {
  const classes = useStyles();
  let token = localStorage.getItem("auth-token");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const employee_Id = _.get(state, "employees.employee.userData.id", "");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedPollId, setSelectedPollId] = useState("");
  const [submitValue, setSubmitValue] = useState({
    poll_Id: "",
    option_Id: "",
  });
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [addModel, setAddModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState({ index: {} });
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [displaySnackbarText, setDisplaySnackbarText] = useState("");
  let polls = _.get(state, "polls.polls", []);

  const handleChange = (event, pollId, optionId) => {
    setSelectedValue(event.target.value);
    setSelectedPollId(pollId);
    setSubmitValue({
      poll_Id: pollId,
      option_Id: optionId,
      employee_Id: employee_Id,
    });
    setError("");
  };

  const isEventsMember = helper.isEventMember(
    _.get(state, "employees.employee.userData.division", "")
  );

  const handleSubmit = async (pollId) => {
    try {
      if (pollId === submitValue.poll_Id) {
        await api.addPoll(token, submitValue).then((response) => {
          const responseData = _.get(response, "data", "");
          if (responseData.messages.status === "33") {
            setError(responseData.messages.message);
          }
          if (responseData.messages.status === "32") {
            dispatch({ type: "GET_POLLS", payload: responseData.polls });
          }
        });
      } else {
        setError("Please submit the selected option.");
        scroll();
      }
    } catch (error) {
      setError("something went wrong, please try again.");
    }
  };

  const addPolls = () => {
    setError("");
    setAddModel(true);
  };

  const deletePolls = (index) => {
    setDeleteModel({
      index: {
        [index]: true,
      },
    });
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };
  const setTime = (deadline) => {
    const now = new Date().getTime();
    const cntdownDate = new Date(deadline).getTime();
    const diff = cntdownDate - now;
    return diff;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const scroll = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        {error && <Alert severity="error"> {error} </Alert>}
        <Grid container justify="flex-end">
          {isEventsMember && (
            <Button
              id="Add-polls-button"
              key="Add-polls-button_"
              className={classes.buttonStyle}
              color="primary"
              justify="flex-end"
              variant={isSmallScreen ? "text" : "contained"}
              size="small"
              onClick={() => addPolls()}
              startIcon={<AddIcon />}
            >
              Add polls
            </Button>
          )}
          {addModel && (
            <AddPolls
              setAddModel={setAddModel}
              setShowSnackbar={setShowSnackbar}
              setDisplaySnackbarText={setDisplaySnackbarText}
            />
          )}
        </Grid>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            style={{ width: "300px", color: "white", background: "#009688" }}
            severity="success"
          >
            {displaySnackbarText}
          </Alert>
        </Snackbar>
        <Grid container spacing={2}>
          {polls.map((poll, pollIndex) => (
            <Grid item key={`poll${poll._id}`} xs={12} sm={12} md={12}>
              <Card className={classes.root} elevation={10}>
                <CardHeader
                  style={{ paddingBottom: "5px", color: "teal" }}
                  title={poll.title.toUpperCase()}
                  subheader={
                    "Posted on " + moment(poll.createdAt).format("Do MMMM YYYY")
                  }
                  titleTypographyProps={{ variant: "h6" }}
                  subheaderTypographyProps={{ className: classes.headingSize }}
                  action={
                    <Box p={2} display="flex" alignItems="center">
                      <Tooltip title="Time Left" aria-label="timeLeft">
                        <ScheduleIcon
                          style={{ fontSize: "1rem", color: "grey" }}
                          size="small"
                        />
                      </Tooltip>
                      &nbsp;
                      <Countdown
                        date={Date.now() + moment(setTime(poll.deadline))}
                        renderer={(props) => (
                          <Typography
                            style={{ color: "grey" }}
                            variant={"body2"}
                          >
                            {props.days} D:
                            {props.hours} H:
                            {props.minutes} M:
                            {props.seconds} S
                          </Typography>
                        )}
                      />
                    </Box>
                  }
                />
                <CardContent
                  style={{ paddingTop: "5px", paddingBottom: "5px" }}
                >
                  <Typography
                    className={classes.qStyles}
                    variant="subtitle1"
                    component="p"
                  >
                    {poll.question}
                  </Typography>

                  <Grid container spacing={4}>
                    {poll.options.map((p, index) => (
                      <Grid
                        item
                        key={`poll_option${index}`}
                        xs={12}
                        sm={6}
                        md={6}
                      >
                        <div style={{ width: "100%", height: "200px" }}>
                          {p.image ? (
                            <img
                              alt={p.title}
                              className={classes.img}
                              src={`http://localhost:5000/${p.image}`}
                            />
                          ) : (
                            <img
                              alt={p.title}
                              className={classes.img}
                              src={pollDefaultImage}
                            />
                          )}
                        </div>
                        <FormControl component="fieldset">
                          <FormControlLabel
                            style={
                              new Date(poll.deadline).getTime() <=
                              new Date().getTime()
                                ? { pointerEvents: "none", opacity: "0.4" }
                                : poll.employeeId.includes(employee_Id)
                                ? { pointerEvents: "none", opacity: "0.4" }
                                : {}
                            }
                            key={`poll_radio${index}`}
                            onChange={(e) => handleChange(e, poll._id, p._id)}
                            checked={
                              p.employeeId.includes(employee_Id)
                                ? p.employeeId.includes(employee_Id)
                                : selectedValue === `${p.option}` &&
                                  selectedPollId === `${poll._id}`
                            }
                            value={p.option}
                            control={<Radio color="primary" />}
                            name="option"
                            label={
                              <Typography style={{ fontSize: "0.9rem" }}>
                                {p.option + " (" + p.votes + ")"}
                              </Typography>
                            }
                          />
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
                <CardActions style={{ padding: "16px", display: "inherit" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      {poll.employeeId.includes(employee_Id) ? (
                        <Typography variant="subtitle2">
                          You have voted for this poll.
                        </Typography>
                      ) : (
                        <br />
                      )}
                      {new Date(poll.deadline).getTime() <=
                        new Date().getTime() && (
                        <Typography variant="subtitle2">
                          This poll is expired.
                        </Typography>
                      )}
                    </div>
                    <div>
                      {!(
                        new Date(poll.deadline).getTime() <=
                        new Date().getTime()
                      ) && (
                        <IconButton
                          className={classes.expand}
                          style={
                            poll.employeeId.includes(employee_Id)
                              ? {
                                  pointerEvents: "none",
                                  opacity: "0.4",
                                }
                              : {}
                          }
                          key={`submitButton${poll._id}`}
                          onClick={() => handleSubmit(poll._id)}
                          size="small"
                          color="primary"
                          variant="contained"
                        >
                          <DoneIcon color="secondary" size="small" />
                        </IconButton>
                      )}
                      {isEventsMember && (
                        <IconButton
                          className={classes.expand}
                          key={`iconDeleteButton${poll._id}`}
                          onClick={() => deletePolls(pollIndex)}
                        >
                          <DeleteIcon color="secondary" size="small" />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  {_.get(deleteModel, `index.${pollIndex}`, false) && (
                    <DeletePolls
                      setDeleteModel={setDeleteModel}
                      poll={poll}
                      setShowSnackbar={setShowSnackbar}
                      setDisplaySnackbarText={setDisplaySnackbarText}
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
