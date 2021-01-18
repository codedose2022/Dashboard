import React from 'react';
import AddEmployee from './AddEmployee';
import {DialogActions,DialogContent,
        Dialog,Button} from '@material-ui/core';
import useStyles from './ListEmployeeStyles';

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
        fullWidth={true}
        maxWidth="md"
        open={open} 
        onClose={handleClose}
        aria-labelledby="form-dialog-title" 
        disableBackdropClick 
      >
      <DialogContent>
        <AddEmployee employee = {props.employee}/>
      </DialogContent>
      <DialogActions>
        <Button className = {classes.addButtonStyle} variant= 'contained' onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
      </Dialog>
    </div>
  );
}