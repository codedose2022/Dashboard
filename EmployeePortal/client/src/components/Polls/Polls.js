import React,{useState,useEffect} from 'react';
import useStyles from './PollsStyles';
import {Card,Button,CardActions,CardContent,Fab,Grid,Typography,
        Container,Tooltip,Radio,Box,FormControlLabel,FormControl} 
        from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import AddPolls from './AddPolls';
import DeletePolls from './DeletePolls';
import option1 from "../../images/1.jpg";
import { useDispatch,useSelector } from "react-redux";
import ScheduleIcon from '@material-ui/icons/Schedule';
import _ from 'lodash';
import moment from 'moment';
import * as helper from "../../helper";
import * as api from "../../api";
import Alert from "@material-ui/lab/Alert";
import Countdown from 'react-countdown';

export default function Polls() {
  const classes = useStyles();
  let token = localStorage.getItem("auth-token");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const employee_Id = _.get(state, "employees.employee.userData.id", "")
  const [selectedValue, setSelectedValue] = useState('');
  const [submitValue, setSubmitValue] = useState({poll_Id:'',option_Id:''});
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);

  const [addModel, setAddModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState({index:{}});
  
  let polls = _.get(state, "polls.polls", []);
  
  const handleChange = (event,pollId,optionId) => {
    setSelectedValue(event.target.value);
    setSubmitValue({
      poll_Id:pollId,
      option_Id:optionId,
      employee_Id:employee_Id,
      });
    setError("");
  };

  const isEventsMember = helper.isEventMember(
    _.get(state, "employees.employee.userData.division", "")
  );

  const validateField = helper.validateRequired(
    _.get(state, "employees.employee.userData.division", "")
  );

  const handleSubmit = async () => {
    try {
      await api
        .addPoll(token, submitValue)
        .then((response) => {
          const responseData = _.get(response, "data", "");
          if (responseData.messages.status === "33") {
            setError(responseData.messages.message);
          }
          if (responseData.messages.status === "32") {
            dispatch({ type: "GET_POLLS", payload: responseData.polls });
          }        
        });
    } catch (error) {
      console.log("Error from server");
    }
  };
 
  const addPolls = () => {
    setAddModel(true);
  }

  const deletePolls = (index) => {
    setDeleteModel({
      index: {
        [index]: true,
      },
    });
  }

  const setTime = (deadline) => {
    const now = new Date().getTime();
    const cntdownDate = new Date(deadline).getTime();
    const diff = cntdownDate - now;
    return diff;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);  

  return (
    <div>
      <Container  className={classes.cardGrid} maxWidth="md">
        { isEventsMember &&
        <Tooltip title="Add" aria-label="add">
          <Fab onClick={()=>addPolls()} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
        }
        {addModel && <AddPolls setAddModel={setAddModel} />}
       
        <Grid container spacing={4}>
          {polls.map((poll,pollIndex) => (     
            <Grid item key={`poll${poll._id}`} xs={12} sm={12} md={6}>
              <Card  className={classes.card} elevation={9}>
                <CardContent className={classes.cardContent}>
                  <Box 
                    className={classes.header} 
                    display="flex"  
                    bgcolor="background.paper">
                    <Box  p={1}>
                    {error && submitValue.poll_Id===poll._id &&
                    <Alert severity='error'> {error} </Alert>}
                    <Typography className={classes.text} 
                      gutterBottom variant="h5" component="h2">
                      {poll.title}
                    </Typography>
                    </Box>
                    <span>
                    <Box p={1} border={1} display="flex">
                    <Tooltip title="Time Left" aria-label="timeLeft">
                      <ScheduleIcon fontSize="large" />    
                    </Tooltip> 
                    <Countdown 
                      date={Date.now() + moment(setTime(poll.deadline))}
                      renderer={props => (
                        <Typography className={classes.text}>
                          {props.days} D:
                          {props.hours} H:
                          {props.minutes} M:
                          {props.seconds} S
                        </Typography>    
                        )} 
                    /> 
                    </Box>
                    </span>
                  </Box>
                  <Typography className={classes.text}>
                   {poll.question}
                  </Typography>
                  <Grid>
                    <Grid container spacing={2}>
                     { poll.options.map((p,index) => (
                       <div key={`poll_option${index}`}>
                        <div className={classes.marginStyle}>
                        <img className={classes.img} src={option1}/>
                        </div>
                        <FormControl component="fieldset">
                        <FormControlLabel
                          style={ new Date(poll.deadline).getTime()<=new Date().getTime() ? 
                            {pointerEvents:"none",opacity:"0.4"}:
                            poll.employeeId.includes(employee_Id) ?
                            {pointerEvents:"none",opacity:"0.4"}:
                            {} }
                          control={<Radio />}
                          key={`poll_radio${index}`}
                          checked={p.employeeId.includes(employee_Id)?p.employeeId.includes(employee_Id):selectedValue === `${p.option}`}
                          onChange={(e)=>handleChange(e,poll._id,p._id)}
                          value={p.option}
                          name="option"
                          label={p.option}
                          labelPlacement="start"
                        />
                        <Typography className={classes.text}>Votes : {p.votes}</Typography>        
                      </FormControl>         
                      </div>
                      )) }  
                       { poll.employeeId.includes(employee_Id) && 
                        <Typography className={classes.text} variant='caption'>
                          You have voted for this poll.
                        </Typography>
                        }  
                    </Grid>
                  </Grid>
                </CardContent>  
                <CardActions className={classes.header}>
                {new Date(poll.deadline).getTime()<=new Date().getTime() ? 
                <div>This poll is expired.</div> : 
                <Button 
                  className={classes.text}
                  style={poll.employeeId.includes(employee_Id) ?{pointerEvents:"none",opacity:"0.4"}:{}}
                  key={`submitButton${poll._id}`} onClick={()=>handleSubmit(pollIndex)} size="small" color="primary">
                  Submit
                </Button> 
                }
                {isEventsMember &&
                  <span>
                  <Tooltip title='Delete'>
                    <Fab
                      color="primary" size="small"
                      key={`iconDeleteButton${poll._id}`}
                      onClick={()=>deletePolls(pollIndex)}
                    >
                      <DeleteIcon  size='small' />
                    </Fab>
                  </Tooltip>
                  </span>
                } 
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