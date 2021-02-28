import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
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
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          style={{ marginTop: "3rem" }}
        >
          <DialogTitle id="form-dialog-title" style={{ padding: 0 }}>
            <div className={classes.modalHeader}>
              <Typography variant="h6" component="h6">
                ADD EMPLOYEE
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
            <AddEmployee handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
}

export default AddEmployeeModel;
