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
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../../api/index";
import UserContext from "../../context/UserContext";
import Mersatlogo from "../../images/Mersatlogo.jpg";
import useStyles from "./LoginPageStyles";

export default function ChangePassword() {
  const classes = useStyles();
  const history = useHistory();
  const { employeeData } = useContext(UserContext);
  const emailId = employeeData?.employee?.userData?.emailId;
  const [changePasswordData, setChangePasswordData] = useState({
    email: emailId,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFieldEmpty = [
      changePasswordData.password,
      changePasswordData.newPassword,
      changePasswordData.confirmPassword,
    ].includes("");
    if (!isFieldEmpty) {
      try {
        seterror("");
        const { data } = await api.changePassword(changePasswordData);
        if (data.messages.status === "12" || data.messages.status === "13") {
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
              EMPLOYEE PORTAL CHANGE PASSWORD
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
            id="email"
            placeholder="EMAIL ADDRESS"
            name="email"
            value={changePasswordData.email}
            size="small"
            disabled
          />
          <TextField
            InputProps={{
              disableUnderline: true,
              classes: { input: classes.input },
            }}
            variant="filled"
            FormHelperTextProps={{
              className: classes.helperTextColor,
            }}
            fullWidth
            size="small"
            margin="normal"
            name="old password"
            placeholder="OLD PASSWORD"
            type="password"
            id="old password"
            value={changePasswordData.password}
            onChange={(e) =>
              setChangePasswordData({
                ...changePasswordData,
                password: e.target.value,
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
            id="new password"
            placeholder="NEW PASSWORD"
            name="new password"
            size="small"
            type="password"
            value={changePasswordData.newPassword}
            onChange={(e) =>
              setChangePasswordData({
                ...changePasswordData,
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
            type="password"
            value={changePasswordData.confirmPassword}
            onChange={(e) =>
              setChangePasswordData({
                ...changePasswordData,
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
            RESET PASSWORD
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
