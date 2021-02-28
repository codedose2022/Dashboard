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
  container: {
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
      display: "flex",
      textAlign: "start",
    },
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "100%",
    alignSelf: "flex-end",
  },

  linkStyle: {
    color: "#1b5e20",
    paddingLeft: "30px",
  },
  profileCard: {
    display: "flex",
    flexDirection: "column",
  },
}));
