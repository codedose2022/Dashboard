import {
  Button,
  Dialog,
  DialogActions,DialogTitle,IconButton,
  DialogContent,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import CloseIcon from '@material-ui/icons/Close';

import AddEmployee from "../Add/AddEmployee";
import useStyles from "./ListEmployeeStyles";

function AddEmployeeModel() {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container justify="flex-end">
        <Button
          className={classes.addButtonStyle}
          color="primary"
          justify="flex-end"
          variant={isSmallScreen ? "text" : "contained"}
          size="small"
          onClick={handleSubmit}
          startIcon={<AddIcon className={classes.tableCellStyle} />}
        >
          Add new employee
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
        >
           <DialogTitle id="form-dialog-title" >
          ADD EMPLOYEE
          <IconButton   aria-label="close" style={{  position: 'absolute',
    right: '10px', top: '2px'}} onClick={handleClose}>
            <CloseIcon />
        </IconButton>
        </DialogTitle>
          <DialogContent>
            <AddEmployee handleClose = {handleClose}/>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions> */}
        </Dialog>
      </Grid>
    </div>
  );
}

export default AddEmployeeModel;
