import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
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
          fullWidth={true}
          maxWidth="md"
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <AddEmployee handleClose = {handleClose}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}

export default AddEmployeeModel;
