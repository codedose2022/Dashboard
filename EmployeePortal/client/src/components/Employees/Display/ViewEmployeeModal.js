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
import useStyles from "./ListEmployeeStyles";

export default function ViewEmployeeModel(props) {
  const [open, setOpen] = React.useState(true);

  const classes = useStyles();
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
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        style={{ marginTop: "3rem" }}
      >
        <DialogTitle id="form-dialog-title" style={{ padding: 0 }}>
          <div className={classes.modalHeader}>
            <Typography variant="h6" component="h6" color="primary">
              VIEW EMPLOYEE
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

        <DialogContent style={{ padding: "0px" }}>
          <MyProfile employee={props.employee} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
