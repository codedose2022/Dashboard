import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../api";

export default function DeletePolls(props) {
  let token = localStorage.getItem("auth-token");
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleCancel = () => {
    setOpen(false);
    props.setDeleteModel(false);
  };

  const handleDelete = async () => {
    try {
      const response = await api.deletePoll(token, props.poll);
      const responseMessages = _.get(response, "data", "");
      if (responseMessages.messages.status === "31") {
        handleCancel();
        dispatch({ type: "GET_POLLS", payload: responseMessages.polls });
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
      aria-labelledby="form-dialog-title"
      disableBackdropClick
    >
      {error && <Alert severity="error"> {error} </Alert>}
      <DialogTitle
        id="form-dialog-title-delete"
        style={{ alignSelf: "center" }}
      >
        Are you sure you want to delete the poll?
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
