import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Link,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as api from "../../api/index";
import Mersatlogo from "../../images/Mersatlogo.jpg";
import useStyles from "./LoginPageStyles";

export default function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();
  const { key } = useParams();
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
    key: key,
  });
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(window.location.href);
    const isFieldEmpty = [
      resetPasswordData.newPassword,
      resetPasswordData.confirmPassword,
    ].includes("");
    if (resetPasswordData.newPassword != resetPasswordData.confirmPassword) {
      seterror("Password provided does not match, Please check again.");
    } else {
      if (!isFieldEmpty) {
        try {
          seterror("");
          const { data } = await api.resetPassword(resetPasswordData);
          if (data.messages.status === "15") {
            seterror(data.messages.message);
          }
          if (data.messages.status === "14") {
            seterror("");
            history.push("/");
          }
        } catch (error) {
          seterror(error.message);
        }
      } else {
        seterror("Enter values for all the field.");
      }
    }
  };
  const cancel = async (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div>
      <Box boxShadow={3} className={classes.root}>
        <AppBar position="static" className={classes.appbar} elevation={0}>
          <Toolbar>
            <img src={Mersatlogo} alt="Mersatlogo" className={classes.logo} />
            <Typography className={classes.title} variant="body2">
              EMPLOYEE PORTAL RESET PASSWORD
            </Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        {error && <Alert severity="error"> {error} </Alert>}
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <TextField
            InputProps={{
              disableUnderline: true,
              classes: { input: classes.input },
            }}
            FormHelperTextProps={{
              className: classes.helperTextColor,
            }}
            variant="filled"
            margin="normal"
            fullWidth
            id="new password"
            placeholder="NEW PASSWORD"
            name="new password"
            size="small"
            type="password"
            value={resetPasswordData.newPassword}
            onChange={(e) =>
              setResetPasswordData({
                ...resetPasswordData,
                newPassword: e.target.value,
              })
            }
          />
          <TextField
            InputProps={{
              disableUnderline: true,
              classes: { input: classes.input },
            }}
            FormHelperTextProps={{
              className: classes.helperTextColor,
            }}
            variant="filled"
            margin="normal"
            fullWidth
            id="confirm password"
            placeholder="CONFIRM PASSWORD"
            name="confirm password"
            size="small"
            value={resetPasswordData.confirmPassword}
            onChange={(e) =>
              setResetPasswordData({
                ...resetPasswordData,
                confirmPassword: e.target.value,
              })
            }
          />
          <Button
            className={classes.buttonStyle}
            variant={"contained"}
            fullWidth
            disableElevation
            style={{ background: "#1b5e20", color: "white" }}
            type="submit"
          >
            SUBMIT
          </Button>
          <Link
            className={classes.buttonStyle}
            style={{ color: "#1b5e20" }}
            onClick={cancel}
          >
            CANCEL
          </Link>
        </form>
      </Box>
    </div>
  );
}