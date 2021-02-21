import {
  Button,
  Dialog,DialogTitle,
  DialogActions,
  DialogContent,IconButton
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

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
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
         <DialogTitle id="form-dialog-title" >
          EDIT EMPLOYEE
          <IconButton   aria-label="close" style={{  position: 'absolute',
    right: '10px', top: '2px'}} onClick={handleClose}>
            <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddEmployee employee={props.employee} handleClose = {handleClose} />
        </DialogContent>
        {/* <DialogActions>
          <Button
            className={classes.addButtonStyle}
            variant="contained"
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
