import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import AddEmployee from "../Add/AddEmployee";
import useStyles from "./ListEmployeeStyles";

export default function EditEmployeeModel(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    props.setEditViewModel(false);
  };
  return (
    <div>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        style={{ marginTop: "3rem" }}
      >
        <DialogTitle id="form-dialog-title" style={{ padding: 0 }}>
          <div className={classes.modalHeader}>
            <Typography variant="h6" component="h6">
              EDIT EMPLOYEE
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
          <AddEmployee employee={props.employee} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
