import {
  Dialog,
  DialogContent,
  IconButton,
  Typography
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import MyProfile from "../Profile/MyProfile";

export default function ViewEmployeeModel(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.setShowViewModel(false);
  };

  const DialogTitle = (props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">
          VIEW EMPLOYEE
          <IconButton
            aria-label="close"
            style={{ position: "absolute", right: "10px", top: "2px" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <MyProfile employee={props.employee} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
