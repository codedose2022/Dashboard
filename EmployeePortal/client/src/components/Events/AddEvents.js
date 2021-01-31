import React, { useState } from "react";
import useStyles from "./EventPageStyles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { validateRequired } from "../../helper";
import Alert from "@material-ui/lab/Alert";
import * as api from "../../api";
import _ from "lodash";
import FileBase from "react-file-base64";
import moment from "moment";
import { getEvents } from "../../actions/events";

import { Button, TextareaAutosize, Grid, TextField } from "@material-ui/core";

export default function AddEvents(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  let token = localStorage.getItem("auth-token");
  const [title, setTitle] = useState(props.event ? props.event.title : "");
  const [date, setDate] = useState(
    props.event ? props.event.date.substring(0, 10) : ""
  );
  const [time, setTime] = useState(props.event ? props.event.time : "");
  const [venue, setVenue] = useState(props.event ? props.event.venue : "");
  const [desc, setDesc] = useState(props.event ? props.event.desc : "");
  const [img, setImg] = useState(props.event ? props.event.img : "");
  const [flag, setShowRequired] = useState(false);
  const [error, setError] = useState("");

  const today = moment();
  const todayDate = today.format("YYYY-MM-DD").toString();

  const handleCancel = () => {
    setOpen(false);
    props.event ? props.setEdit(false) : props.setOpenModel(false);
  };

  const handleAdd = async () => {
    // setOpen(false);
    //props.setOpenModel(false);
    setShowRequired(true);

    const isFieldEmpty = [title, date, venue, time, desc].includes("");
    if (!isFieldEmpty) {
      let event = { title, date, venue, desc, img, time };
      try {
        await api
          .addEvent(token, event)
          .then((response) => {
            const responseData = _.get(response, "data.responseData", "");
            if (responseData.messages.status === "21") {
              dispatch(getEvents(token, props.userData.division));
            }
          })
          .catch((error) => {
            const responseData = _.get(error.response, "data.responseData", "");
            if (responseData.messages.status === "22") {
              setError(responseData.messages.message);
            }
          });
      } catch (error) {
        setError("something went wrong, please try again.");
      }
    }
  };

  const handleEdit = async () => {
    setShowRequired(true);
    const isFieldEmpty = [title, date, time, desc, venue].includes("");
    if (!isFieldEmpty) {
      let event = { title, date, venue, desc, img, time, _id: props.event._id, status: 'pending' };
      try {
        const response = await api.editEvent(token, event);

        const responseData = _.get(response, "data.responseData", "");
        if (responseData.messages.status === "21") {
         dispatch(getEvents(token, props.userData.division));
        }
      } catch (error) {
        setError("something went wrong, please try again.");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    props.event ? props.setEdit(false) : props.setOpenModel(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title-add-events'
      disableBackdropClick
      PaperProps={{
        style: {
          backgroundColor: '#f3ede5',
          boxShadow: 'none',
        },
      }}
    >
      <DialogTitle
        id='form-dialog-title-Addevents'
        style={{ alignSelf: "center",color:'darkgreen' }}
      
      >
        {props.event ? "EDIT EVENT" : "ADD NEW EVENT"}
      </DialogTitle>
      <DialogContent>
        <div className={classes.marginStyle}>
          {error && <Alert severity='error'> {error} </Alert>}
          <form autoComplete='off'>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  FormHelperTextProps={{
                    className: classes.helperTextColor,
                  }}
                  type='text'
                  id='Title'
                  helperText={flag && validateRequired(title)}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label='Title'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  FormHelperTextProps={{
                    className: classes.helperTextColor,
                  }}
                  inputProps={{
                    min: `${todayDate}`,
                  }}
                  id='Date'
                  helperText={flag && validateRequired(date)}
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  type='date'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label='Event Date'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  FormHelperTextProps={{
                    className: classes.helperTextColor,
                  }}
                  type='time'
                  helperText={flag && validateRequired(date)}
                  id='Event Time'
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                  label='Event Time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  FormHelperTextProps={{
                    className: classes.helperTextColor,
                  }}
                  id='Venue'
                  type='text'
                  helperText={flag && validateRequired(venue)}
                  onChange={(e) => setVenue(e.target.value)}
                  value={venue}
                  label='Venue'
                />
              </Grid>

              <Grid item xs={12}>
                <div className={classes.fileInputStyle}>
                  <FileBase
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) => setImg({ base64 })}
                  />
                </div>
              </Grid>

              <Grid className={classes.textEditor}>
                <TextareaAutosize
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className={classes.textAreaStyle}
                  aria-label='minimum height'
                  rowsMin={10}
                  placeholder='Description'
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          size='small'
          variant='contained'
          onClick={handleCancel}
          color='primary'
        >
          cancel
        </Button>
        <Button
          size='small'
          variant='contained'
          onClick={props.event ? handleEdit : handleAdd}
          color='primary'
          autoFocus
        >
          {props.event ? "Done" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
