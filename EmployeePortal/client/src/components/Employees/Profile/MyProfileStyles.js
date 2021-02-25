import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({

  firstPaper: {
    padding: "10px",
    marginBottom: "10px",
  },
  paper: {
    padding: "10px",
    // marginBottom: "10px",
  },
  typography: {
    padding: "3px",
    marginLeft: "5%",
    marginTop: "2%",
  },
  typography1: {
    padding: "3px",
    marginLeft: "5%",
  },
  container: {
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
      display: "flex",
      textAlign: "start",
     
    },
  },
  image: {
    marginLeft: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "150px",
      height: "150px",
    },
    [theme.breakpoints.up("md")]: {
      width: "180px",
      height: "180px",
    },
  },

  linkStyle: {
    color: "#1b5e20",
    paddingLeft: "30px",
  },
}));
