import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import AddEmployee from "../Add/AddEmployee";

export default function EditEmployeeModel(props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    props.setEditViewModel(false);
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">
          EDIT EMPLOYEE
          <IconButton
            aria-label="close"
            style={{ position: "absolute", right: "10px", top: "2px" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddEmployee employee={props.employee} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
