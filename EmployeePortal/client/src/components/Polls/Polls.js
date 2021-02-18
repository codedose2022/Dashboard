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
  Tooltip,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ScheduleIcon from "@material-ui/icons/Schedule";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api";
import * as helper from "../../helper";
import option1 from "../../images/1.jpg";
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

  const handleSubmit = async () => {
    try {
      console.log(submitValue);
      await api.addPoll(token, submitValue).then((response) => {
        const responseData = _.get(response, "data", "");
        if (responseData.messages.status === "33") {
          setError(responseData.messages.message);
        }
        if (responseData.messages.status === "32") {
          dispatch({ type: "GET_POLLS", payload: responseData.polls });
        }
      });
    } catch (error) {
      setError("something went wrong, please try again.");
    }
  };

  const addPolls = () => {
    setAddModel(true);
  };

  const deletePolls = (index) => {
    setDeleteModel({
      index: {
        [index]: true,
      },
    });
  };

  const setTime = (deadline) => {
    const now = new Date().getTime();
    const cntdownDate = new Date(deadline).getTime();
    const diff = cntdownDate - now;
    return diff;
  };
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container justify="flex-end">
          {isEventsMember && (
            <Button
              id="Add-polls-button"
              key="Add-polls-button_"
              className={classes.buttonStyle}
              color="primary"
              justify="flex-end"
              variant="contained"
              size="small"
              onClick={() => addPolls()}
              startIcon={<AddIcon />}
            >
              Add polls
            </Button>
          )}
          {addModel && <AddPolls setAddModel={setAddModel} />}
        </Grid>
        <Grid container spacing={4}>
          {polls.map((poll, pollIndex) => (
            <Grid item key={`poll${poll._id}`} xs={12} sm={6} md={6}>
              <Card className={classes.root} elevation={10}>
                <CardHeader
                  action={
                    <span>
                      <Box p={1} border={1} display="flex">
                        <Tooltip title="Time Left" aria-label="timeLeft">
                          <ScheduleIcon size="small" />
                        </Tooltip>
                        <Countdown
                          date={Date.now() + moment(setTime(poll.deadline))}
                          renderer={(props) => (
                            <Typography variant={"body2"}>
                              {props.days} D:
                              {props.hours} H:
                              {props.minutes} M:
                              {props.seconds} S
                            </Typography>
                          )}
                        />
                      </Box>
                    </span>
                  }
                  title={poll.title}
                  subheader={
                    "Posted on " + moment(poll.createdAt).format("Do MMMM YYYY")
                  }
                  
                />

                <CardContent>
                  <Typography variant="subtitle1" component="p">
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
                        <div>
                          <img className={classes.img} src={option1} />
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
                            label={p.option + " (" + p.votes + ")"}
                          />
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                  {poll.employeeId.includes(employee_Id) ? (
                    <Typography variant="subtitle2" component="p">
                      You have voted for this poll.
                    </Typography>
                  ) : (
                    <br />
                  )}
                </CardContent>
                <CardActions disableSpacing>
                  {new Date(poll.deadline).getTime() <= new Date().getTime() ? (
                    <Typography style={{ marginLeft: "10px" }}>
                      This poll is expired
                    </Typography>
                  ) : (
                    <Button
                      style={
                        poll.employeeId.includes(employee_Id)
                          ? {
                              pointerEvents: "none",
                              opacity: "0.4",
                              marginLeft: "8px",
                            }
                          : { marginLeft: "8px" }
                      }
                      key={`submitButton${poll._id}`}
                      onClick={() => handleSubmit(pollIndex)}
                      size="small"
                      color="primary"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  )}
                  {isEventsMember && (
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      key={`iconDeleteButton${poll._id}`}
                      onClick={() => deletePolls(pollIndex)}
                    >
                      <DeleteIcon color="primary" size="small" />
                    </IconButton>
                  )}
                  {_.get(deleteModel, `index.${pollIndex}`, false) && (
                    <DeletePolls setDeleteModel={setDeleteModel} poll={poll} />
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
