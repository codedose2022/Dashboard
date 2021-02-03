import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import Mersatlogo from "../../images/Mersatlogo.jpg";
import useStyles from "./LoginPageStyles";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

export default function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();

  const [resetPasswordData, setResetPasswordData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            // helperText = {passwordRequired}
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
            //helperText = {newPassword}
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
            //helperText = {confirmPassword}
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
