import React, { useState } from "react";
import { Dialog, DialogActions,DialogTitle,Button} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import * as api from "../../api";
import { useDispatch } from "react-redux";
import _ from "lodash";

export default function DeletePolls(props) {
  const theme = useTheme();
  let token = localStorage.getItem("auth-token");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
      console.log(response);
      const responseMessages = _.get(response, "data", "");
      if (responseMessages.messages.status === "31") {
        dispatch({ type: "GET_POLLS", payload: responseMessages.polls });
      }
    } catch (error) {
      setError("something went wrong, please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby='form-dialog-title'
      disableBackdropClick
    >
      <DialogTitle
        id='form-dialog-title-delete'
        style={{ alignSelf: "center" }}
      >
        Are you sure you want to delete the poll?
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
