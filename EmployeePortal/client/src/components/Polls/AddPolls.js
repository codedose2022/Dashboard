import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  IconButton,
  DialogActions,
  Button,
} from "@material-ui/core";
import * as api from "../../api";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { validateRequired } from "../../helper";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./PollsStyles";
import moment from "moment";

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
      votes: 0,
    },
    {
      option: "",
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
  const handleRemoveFields = (index) => {
    const values = [...options];
    values.splice(index, 1);
    setOptions(values);
  };
  const handleClose = () => {
    setOpen(false);
    props.setAddModel(false);
  };
  const handleAdd = async () => {
    setShowRequired(true);
    const isFieldEmpty = [title, question, options, deadline].includes("");
    if (!isFieldEmpty) {
      let poll = { title, question, options, deadline };
      try {
        await api.createPoll(token, poll).then((response) => {
          const responseMessages = _.get(response, "data", "");
          if (
            responseMessages.messages.status === "34" ||
            responseMessages.messages.status === "35"
          ) {
            setError(responseMessages.messages.message);
          }
          if (responseMessages.messages.status === "30") {
            handleClose();
            dispatch({ type: "GET_POLLS", payload: responseMessages.polls });
          }
        });
      } catch (error) {
        setError("Something went wrong, please try again.");
      }
    }
  };
  return (
    <div>
      <Dialog open={open} aria-labelledby='form-dialog-title'>
        {error && <Alert severity='error'> {error} </Alert>}
        <DialogTitle id='form-dialog-title'> Add Poll</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='title'
                name='title'
                label='Title'
                type='text'
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
                id='deadline'
                name='deadline'
                label='Deadline'
                type='datetime-local'
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
                id='question'
                name='question'
                label='Question'
                value={question}
                type='text'
                FormHelperTextProps={{
                  className: classes.helperTextColor,
                }}
                helperText={flag && validateRequired(question)}
                onChange={(e) => setQuestion(e.target.value)}
                fullWidth
              />
            </Grid>
            {options.map((option, index) => (
              <div key={index}>
                <TextField
                  required
                  id='option'
                  name='option'
                  label='Option'
                  value={option.option}
                  type='text'
                  FormHelperTextProps={{
                    className: classes.helperTextColor,
                  }}
                  helperText={flag && validateRequired(option.option)}
                  onChange={(e) => handleChangeInput(index, e)}
                />
              </div>
            ))}
            <IconButton
              disabled={options.length < 3}
              onClick={() => handleRemoveFields()}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={() => handleAddFields()}>
              <AddIcon />
            </IconButton>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAdd} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
