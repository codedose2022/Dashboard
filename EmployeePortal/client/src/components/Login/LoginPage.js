import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  createMuiTheme,
  ThemeProvider,
  Link,
  Grid,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import Mersatlogo from "../../images/Mersatlogo.jpg";
import { green } from "@material-ui/core/colors";
import useStyles from "./LoginPageStyles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/employees";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Alert from "@material-ui/lab/Alert";
import * as api from "../../api";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
    },
  },
});

export default function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { setEmployeeData } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [emailRequired, setEmailRequired] = useState("");
  const [passwordRequired, setPasswordRequired] = useState("");
  const [forgotPass, setForgotPass] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const state = useSelector((state) => state);
  const loggedIn = _.get(state, "employees.loggedInStatus", "");
  const messageStatus = _.get(state, "employees.employee.messages.status", "");

  useEffect(() => {
    if (loggedIn === "loggedIn") {
      const token = _.get(state, "employees.employee.token", "");
      setEmployeeData({
        token: token,
        employee: _.get(state, "employees.employee", ""),
      });
      localStorage.setItem("auth-token", token);
      history.push("/");
    }
    if (messageStatus === "10" || messageStatus === "12") {
      let errMsg = _.get(state, "employees.employee.messages.message", "");
      seterror(errMsg);
    }
    if (messageStatus === "11") {
      seterror("");
    }
  }, [loggedIn, messageStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      if (loginData.email === "") {
        setEmailRequired("Please enter the email address");
      }
      if (loginData.password === "") {
        setPasswordRequired("Please enter the password");
      }
      if(!forgotPass)
      {  
      setLinkSent(false);
      clearFieldError();
      } 
      if (loginData.email !== "" && loginData.password !== "" && !forgotPass) {
        dispatch(login(loginData));
        clearFieldError();
      }
      if (forgotPass) {
        if (loginData.email === "") {
          setEmailRequired("Please enter the email address");
        } else {
          try {
            seterror("");
            const { data } = await api.sendResetLink({
              email: loginData.email,
            });
            if (data.messages.status === "10") {
              seterror(data.messages.message);
              setLinkSent(false);
            }
            if (data.messages.status === "13") {
              setSuccessMsg(data.messages.message);
              setLinkSent(true);
              setForgotPass(false);
            }
          
          } catch (error) {
            seterror(error.message);
          }
        }
      }
     
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loginData.email !== "") setEmailRequired("");
    if (loginData.password !== "") setPasswordRequired("");
  }, [loginData.email, loginData.password]);


  const clearFieldError = () => {
    setEmailRequired("");
    setPasswordRequired("");
  };
  const handleLinkClick = () => {
    seterror("");
    clearFieldError();
    setLoginData({
      email: "",
      password: "",
    })
    setForgotPass(!forgotPass);
  }

  return (
    <div>
      
    <Box boxShadow={3} className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" className={classes.appbar} elevation={0}>
          <Toolbar>
            <img src={Mersatlogo} alt="Mersatlogo" className={classes.logo} />
            <Typography className={classes.title} variant="body2">
              EMPLOYEE PORTAL LOGIN
            </Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline />

        {error && !linkSent && <Alert severity="error"> {error} </Alert>}
        {successMsg && linkSent && <Alert severity="success"> {successMsg} </Alert>}
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          {!linkSent && (
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
            size="small"
            value={loginData.email}
            helperText={emailRequired}
            onChange={(e) => onChange(e)}
          />
          )}
          {!forgotPass && !linkSent && (
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
              name="password"
              placeholder="PASSWORD"
              type="password"
              id="password"
              helperText={passwordRequired}
              value={loginData.password}
              onChange={(e) => onChange(e)}
            />
          )}
          
          <Button
            className={classes.buttonStyle}
            variant={"contained"}
            fullWidth
            disableElevation
            color={"primary"}
            type="submit"
          >
            {forgotPass ? "SET RESET LINK" : "LOGIN"}
          </Button>
          
          {!linkSent &&
          <Grid
            className={classes.buttonStyle}
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Link variant="caption" onClick={()=>handleLinkClick()}>
              {forgotPass ? "Login" : "Forgot password"}
            </Link>
          </Grid>
          }
        </form>
      
      
      </ThemeProvider>
    </Box>
    
    </div>
  );
}
