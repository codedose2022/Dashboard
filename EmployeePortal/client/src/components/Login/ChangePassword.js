import React, { useState,  useContext } from "react";
import {
  AppBar,Snackbar,Toolbar,Typography,Button,
  Box,Link,TextField,CssBaseline,
} from "@material-ui/core";
import Mersatlogo from "../../images/Mersatlogo.jpg";
import useStyles from "./LoginPageStyles";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import UserContext from "../../context/UserContext";
import * as api from "../../api/index";

export default function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();
  const { employeeData } = useContext(UserContext);
  const emailId = employeeData?.employee?.userData?.emailId;
  const [resetPasswordData, setResetPasswordData] = useState({
    email: emailId,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFieldEmpty = [
      resetPasswordData.password,
      resetPasswordData.newPassword,
      resetPasswordData.confirmPassword,
    ].includes("");
    if (!isFieldEmpty) {
      try {
        seterror("");
        const { data } = await api.changePassword(resetPasswordData);
        if (data.messages.status === "12" || data.messages.status === "13") {
          seterror(data.messages.message);
        }
        if (data.messages.status === "14") {
          seterror("");
          history.push("/Dashboard");
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
    history.push("/Dashboard");
  };

  return (
    <div>
      <Box boxShadow={3} className={classes.root}>
        <AppBar position='static' className={classes.appbar} elevation={0}>
          <Toolbar>
            <img src={Mersatlogo} alt='Mersatlogo' className={classes.logo} />
            <Typography className={classes.title} variant='body2'>
              EMPLOYEE PORTAL RESET PASSWORD
            </Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        {error && <Alert severity='error'> {error} </Alert>}
        <form
          autoComplete='off'
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
            variant='filled'
            margin='normal'
            fullWidth
            id='email'
            placeholder='EMAIL ADDRESS'
            name='email'
            value={resetPasswordData.email}
            size='small'
            disabled
          />
          <TextField
            InputProps={{
              disableUnderline: true,
              classes: { input: classes.input },
            }}
            variant='filled'
            FormHelperTextProps={{
              className: classes.helperTextColor,
            }}
            fullWidth
            size='small'
            margin='normal'
            name='old password'
            placeholder='OLD PASSWORD'
            type='password'
            id='old password'
            value={resetPasswordData.password}
            onChange={(e) =>
              setResetPasswordData({
                ...resetPasswordData,
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
            variant='filled'
            margin='normal'
            fullWidth
            id='new password'
            placeholder='NEW PASSWORD'
            name='new password'
            size='small'
            type='password'
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
            variant='filled'
            margin='normal'
            fullWidth
            id='confirm password'
            placeholder='CONFIRM PASSWORD'
            name='confirm password'
            size='small'
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
            type='submit'
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