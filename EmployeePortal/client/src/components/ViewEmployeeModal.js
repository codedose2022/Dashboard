import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyProfile from './MyProfile';
import useStyles from './ListEmployeeStyles';

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
       onClose={handleClose}
       aria-labelledby="form-dialog-title" 
       disableBackdropClick 
         >
        <DialogTitle 
        id="form-dialog-title" 
       
        style = {{alignSelf:  'center' }}>
        View Employee
        </DialogTitle>
        <DialogContent>
          <MyProfile employee = {props.employee}/>
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
