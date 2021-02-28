import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getEvents } from "../../actions/events";
import * as api from "../../api";

export default function DeleteEvent(props) {
  let token = localStorage.getItem("auth-token");

  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleCancel = () => {
    setOpen(false);
    props.setDelete(false);
  };

  const handleDelete = async () => {
    try {
      const response = await api.deleteEvent(token, props.event);

      const responseData = _.get(response, "data.responseData", "");
      if (responseData.messages.status === "21") {
        handleCancel();
        dispatch(getEvents(token, props.userData.division));
        props.setShowSnackbar(true);
        props.setDisplaySnackbarText("Post deleted successfully");
      }
    } catch (error) {
      setError("something went wrong, please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      disableBackdropClick
    >
      {error && <Alert severity="error"> {error} </Alert>}
      <DialogTitle
        id="form-dialog-title-delete"
        style={{ alignSelf: "center" }}
      >
        Are you sure you want to delete the event?
      </DialogTitle>

      <DialogActions>
        <Button
          size="small"
          variant="contained"
          onClick={handleCancel}
          color="primary"
        >
          cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleDelete}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
