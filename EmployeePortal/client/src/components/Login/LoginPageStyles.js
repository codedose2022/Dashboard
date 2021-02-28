import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  logo: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "20%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "20%",
    },

    maxHeight: "80%",
  },
  loginHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem",
    "& h6": {
      marginTop: "1rem",
    },
  },
  form: {
    padding: "1rem",
  },
  input: {
    fontSize: "11px",
  },
  buttonStyle: {
    marginTop: "15px",
    marginBottom: "30px",
  },
  buttonResetPassword: {
    marginTop: "20px",
    marginBottom: "5px",
  },
  absoluteCard: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    [theme.breakpoints.between("xs", "md")]: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
    },
  },
  Link: {
    cursor: "pointer",
  },
  helperTextColor: {
    color: "#d50000",
  },
  cancelLink: {
    justifyContent: "center",
    display: "flex",
    marginTop: "20px",
    marginBottom: "5px",
    color: "#1b5e20",
    cursor: "pointer",
    textDecoration: "none",
  },
}));
