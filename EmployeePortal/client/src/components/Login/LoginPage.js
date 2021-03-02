import {
  Button,
  Card,
  Container,
  createMuiTheme,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../actions/employees";
import * as api from "../../api";
import UserContext from "../../context/UserContext";
import Mersatlogo from "../../images/Mersatlogo.jpg";
import useStyles from "./LoginPageStyles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#f50057",
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

  function setNetworkErrors(err) {
    seterror(err);
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, messageStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginData.email === "") {
        setEmailRequired("Email required.");
      }
      if (loginData.password === "") {
        setPasswordRequired("Password required.");
      }
      if (!forgotPass && linkSent) {
        setLinkSent(false);
        clearFieldError();
      }
      if (loginData.email !== "" && loginData.password !== "" && !forgotPass) {
        dispatch(login(loginData, setNetworkErrors));
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
    });
    setForgotPass(!forgotPass);
  };

  return (
    <>
      <Grid container>
        <Grid item lg={4} md={5} sm={10} className={classes.absoluteCard}>
          <Card className={classes.loginCard}>
            <ThemeProvider theme={theme}>
              <Container className={classes.loginHeader}>
                <img
                  src={Mersatlogo}
                  alt="Mersatlogo"
                  className={classes.logo}
                />
                <Typography className={classes.title} variant="h6">
                  EMPLOYEE PORTAL LOGIN
                </Typography>
              </Container>
              <CssBaseline />

              {error && !linkSent && <Alert severity="error"> {error} </Alert>}
              {successMsg && linkSent && (
                <Alert severity="success"> {successMsg} </Alert>
              )}
              <form
                autoComplete="off"
                className={classes.form}
                onSubmit={handleSubmit}
              >
                <Grid container>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                </Grid>
                <Button
                  className={classes.buttonStyle}
                  variant={"contained"}
                  fullWidth
                  disableElevation
                  color="primary"
                  type="submit"
                >
                  {forgotPass ? "SEND RESET LINK" : "LOGIN"}
                </Button>

                {!linkSent && (
                  <Grid
                    className={classes.buttonStyle}
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Link
                      className={classes.Link}
                      onClick={() => handleLinkClick()}
                    >
                      {forgotPass ? "Login" : "Forgot password"}
                    </Link>
                  </Grid>
                )}
              </form>
            </ThemeProvider>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
