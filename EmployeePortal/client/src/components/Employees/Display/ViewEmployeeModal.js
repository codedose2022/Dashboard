import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import MyProfile from "../Profile/MyProfile";
import useStyles from "./ListEmployeeStyles";

export default function ViewEmployeeModel(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.setShowViewModel(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title" style={{ alignSelf: "center" }}>
          View Employee
        </DialogTitle>
        <DialogContent>
          <MyProfile employee={props.employee} />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.addButtonStyle}
            variant="contained"
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
