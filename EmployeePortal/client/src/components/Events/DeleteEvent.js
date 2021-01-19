import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import * as api from "../../api";
import { useDispatch } from "react-redux";
import _ from "lodash";

export default function DeleteEvent(props) {
  const theme = useTheme();
  let token = localStorage.getItem("auth-token");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  console.log(props.event);

  const handleClose = () => {
    setOpen(false);
    props.setDelete(false);
  };

  const handleCancel = () => {
    setOpen(false);
    props.setDelete(false);
  };

  const handleDelete = async () => {
    try {
      const response = await api.deleteEvent(token, props.event);

      const responseData = _.get(response, "data.responseData", "");
      if (responseData.messages.status === "21") {
        dispatch({ type: "ADD_EVENTS", payload: responseData.events });
      }
    } catch (error) {
      setError("something went wrong, please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'
      disableBackdropClick
    >
      <DialogTitle
        id='form-dialog-title-delete'
        style={{ alignSelf: "center" }}
      >
        Are you sure you want to delete the event?
      </DialogTitle>

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
          onClick={handleDelete}
          color='primary'
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
