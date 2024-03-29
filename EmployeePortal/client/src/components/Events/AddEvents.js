import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,



  IconButton, TextareaAutosize,
  TextField,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getEvents } from "../../actions/events";
import * as api from "../../api";
import { validateRequired } from "../../helper";
import useStyles from "./EventPageStyles";

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
  const [imageRequired, setImageRequired] = useState("");
  const [filename, setFilename] = useState(props.event ? props.event.img : "");

  const today = moment().add(1, "d");
  const todayDate = today.format("YYYY-MM-DD").toString();

  const handleCancel = () => {
    setOpen(false);
    props.event ? props.setEdit(false) : props.setOpenModel(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (img === "") setImageRequired("Please add an image");
    setShowRequired(true);
    const isFieldEmpty = [title, date, venue, time, img, desc].includes("");
    if (!isFieldEmpty) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("venue", venue);
      formData.append("desc", desc);
      formData.append("time", time);
      formData.append("img", img);
      try {
        await api
          .addEvent(token, formData)
          .then((response) => {
            const responseData = _.get(response, "data.responseData", "");
            if (responseData.messages.status === "21") {
              handleCancel();
              dispatch(getEvents(token, props.userData.division));
              props.setShowSnackbar(true);
              props.setDisplaySnackbarText("Posted successfully");
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
    if (img === "") setImageRequired("Please add an image");
    const isFieldEmpty = [title, date, time, desc, venue, img].includes("");
    if (!isFieldEmpty) {
      let event = {
        title,
        date,
        venue,
        desc,
        img,
        time,
        _id: props.event._id,
        status: "pending",
      };
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("venue", venue);
      formData.append("desc", desc);
      formData.append("time", time);
      formData.append("_id", event._id);
      formData.append("status", "pending");
      formData.append("img", img);
      try {
        const response = await api.editEvent(token, formData);
        const responseData = _.get(response, "data.responseData", "");
        if (responseData.messages.status === "21") {
          handleCancel();
          dispatch(getEvents(token, props.userData.division));
          props.setShowSnackbar(true);
          props.setDisplaySnackbarText("Edited successfully");
        }
      } catch (error) {
        setError("something went wrong, please try again.");
      }
    }
  };

  const setImage = (e) => {
    setImageRequired("");
    let filename =
      e.target.files[0] === undefined
        ? "No image chosen"
        : e.target.files[0].name;
    setFilename(filename);
    let pic = e.target.files[0] === undefined ? "" : e.target.files[0];
    setImg(pic);
  };

  const handleClose = () => {
    setOpen(false);
    props.event ? props.setEdit(false) : props.setOpenModel(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title-add-events"
      disableBackdropClick
      style={{ marginTop: "3rem" }}
    >
      <DialogTitle id="form-dialog-title" style={{ padding: 0 }}>
        <div className={classes.modalHeader}>
          <Typography variant="h6" component="h6" color="primary">
            {" "}
            {props.event ? "EDIT EVENT" : "ADD NEW EVENT"}
          </Typography>
          <IconButton
            aria-label="close"
            size="small"
            onClick={(e) => handleCancel()}
            className={classes.closeBtn}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={classes.marginStyle}>
          {error && <Alert severity="error"> {error} </Alert>}
          <form autoComplete="off">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  FormHelperTextProps={{
                    className: classes.helperTextColor,
                  }}
                  type="text"
                  id="Title"
                  helperText={flag && validateRequired(title)}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Title"
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
                  id="Date"
                  helperText={flag && validateRequired(date)}
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Event Date"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  FormHelperTextProps={{
                    className: classes.helperTextColor,
                  }}
                  type="time"
                  helperText={flag && validateRequired(date)}
                  id="Event Time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                  label="Event Time"
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
                  id="Venue"
                  type="text"
                  helperText={flag && validateRequired(venue)}
                  onChange={(e) => setVenue(e.target.value)}
                  value={venue}
                  label="Venue"
                />
              </Grid>

              <Grid item xs={12} className={classes.fileInputStyle}>
                <input
                  accept="image/x-png,image/jpeg,image/png,image/jpg,image/jfif"
                  type="file"
                  style={{ color: "transparent" }}
                  name="img"
                  onChange={(e) => setImage(e)}
                />
                <p className={classes.imgRequired} style={{ color: "black" }}>
                  {filename}
                </p>
                <p className={classes.imgRequired}>{imageRequired}</p>
              </Grid>

              <Grid className={classes.textEditor}>
                <TextareaAutosize
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className={classes.textAreaStyle}
                  aria-label="minimum height"
                  rowsMin={10}
                  placeholder="Description"
                />
                {flag && (
                  <p className={classes.imgRequired}>
                    {validateRequired(desc)}
                  </p>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          onClick={props.event ? handleEdit : handleAdd}
          color="primary"
          autoFocus
        >
          {props.event ? "Done" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
