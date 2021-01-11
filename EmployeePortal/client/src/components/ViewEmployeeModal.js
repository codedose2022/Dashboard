import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyProfile from './MyProfile';


export default function ViewEmployeeModel(props) {

const [open, setOpen] = React.useState(true);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  props.setShowViewModel(false);
};
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick  >
        <DialogTitle id="form-dialog-title">View Employee</DialogTitle>
        <DialogContent>
          <MyProfile/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
