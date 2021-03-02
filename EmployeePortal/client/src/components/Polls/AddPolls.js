import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from "@material-ui/icons/Remove";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../api";
import { validateRequired } from "../../helper";
import useStyles from "./PollsStyles";

export default function AddPolls(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  let token = localStorage.getItem("auth-token");
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [flag, setShowRequired] = useState(false);
  const [question, setQuestion] = useState("");
  let [options, setOptions] = useState([
    {
      option: "",
      image: "",
      votes: 0,
    },
    {
      option: "",
      image: "",
      votes: 0,
    },
  ]);
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleAddFields = () => {
    setOptions([...options, { option: "" }]);
  };
  const handleChangeInput = (index, e) => {
    const values = [...options];
    values[index][e.target.name] = e.target.value;
    setOptions(values);
  };
  const handleChangeInputPhoto = (index, e) => {
    const values = [...options];
    values[index][e.target.name] = e.target.files[0];
    setOptions(values);
  };
  const handleRemoveFields = (index) => {
    const values = [...options];
    values.splice(index - 1, 1);
    setOptions(values);
  };
  const handleClose = () => {
    setOpen(false);
    props.setAddModel(false);
  };
  const handleAdd = async () => {
    setShowRequired(true);
    let isFieldEmpty = [title, question, deadline].includes("");
    options.forEach((option) => {
      if (option.option === "") {
        isFieldEmpty = true;
      }
    });
    if (!isFieldEmpty) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("question", question);
      formData.append("options", JSON.stringify(options));
      options.forEach((option, index) => {
        formData.append("image", option.image);
      });
      formData.append("deadline", deadline);
      try {
        await api.createPoll(token, formData).then((response) => {
          const responseMessages = _.get(response, "data", "");
          if (
            responseMessages.messages.status === "34" ||
            responseMessages.messages.status === "35" ||
            responseMessages.messages.status === "36"
          ) {
            setError(responseMessages.messages.message);
          }
          if (responseMessages.messages.status === "30") {
            handleClose();
            dispatch({ type: "GET_POLLS", payload: responseMessages.polls });
            props.setShowSnackbar(true);
            props.setDisplaySnackbarText("Posted successfully");
          }
        });
      } catch (error) {
        setError("Something went wrong, please try again.");
      }
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        style={{ marginTop: "3rem" }}
      >
        {error && <Alert severity="error"> {error} </Alert>}
        <DialogTitle id="form-dialog-title" style={{ padding: 0 }}>
          <div className={classes.modalHeader}>
            <Typography variant="h6" component="h6" color="primary">
              ADD NEW POLL
            </Typography>
            <IconButton
              aria-label="close"
              size="small"
              onClick={handleClose}
              className={classes.closeBtn}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                type="text"
                FormHelperTextProps={{
                  className: classes.helperTextColor,
                }}
                helperText={flag && validateRequired(title)}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="deadline"
                name="deadline"
                label="Deadline"
                type="datetime-local"
                FormHelperTextProps={{
                  className: classes.helperTextColor,
                }}
                inputProps={{
                  min: `${moment().format("YYYY-MM-DDTHH:mm").toString()}`,
                }}
                helperText={flag && validateRequired(deadline)}
                fullWidth
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="question"
                name="question"
                label="Question"
                value={question}
                type="text"
                FormHelperTextProps={{
                  className: classes.helperTextColor,
                }}
                helperText={flag && validateRequired(question)}
                onChange={(e) => setQuestion(e.target.value)}
                fullWidth
              />
            </Grid>
            {options.map((option, index) => (
              <Grid container key={index}>
                <Grid item lg={5}>
                  <TextField
                    style={{ margin: "10px" }}
                    required
                    id="option"
                    name="option"
                    label=" Option"
                    value={option.option}
                    type="text"
                    FormHelperTextProps={{
                      className: classes.helperTextColor,
                    }}
                    helperText={flag && validateRequired(option.option)}
                    onChange={(e) => handleChangeInput(index, e)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <input
                    accept="image/x-png,image/jpeg,image/png,image/jpg,image/jfif"
                    style={{
                      margin: "10px",
                      paddingTop: "28px",
                      marginRight: "10px",
                    }}
                    name="image"
                    id={index}
                    type="file"
                    onChange={(e) => handleChangeInputPhoto(index, e)}
                  />
                </Grid>
              </Grid>
            ))}
            <IconButton
              disabled={options.length < 3}
              onClick={() => handleRemoveFields(options.length)}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={() => handleAddFields()}>
              <AddIcon />
            </IconButton>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAdd}
            size="small"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
