import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  profileGrid: {
    // position: "fixed",
    width: "30%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    transform: "translateY(-25%)",
    [theme.breakpoints.down("sm")]: {
      transform: "translateY(-15%)",
    },
  },
  profileAvatar: {
    "& img": {
      width: "8rem",
      height: "8rem",
      objectFit: "cover",
      borderRadius: "100%",
      transform: "translateY(50%)",
      border: "5px solid #26a69a",
      boxShadow: "0 0 0 6px #26a69a52",
    },
  },
  profileInfoGrid: {
    // marginLeft: "33.33%",
  },
  profileCard: {
    width: "100%",
    // padding: "1rem",
    paddingTop: "5rem",
    textAlign: "center",
    textTransform: "uppercase",
    background: "#b2dfdb",
    color: "#404040",
    "& p": {
      fontSize: "12px",
    },
  },
  profileInfoCard: {
    padding: "1rem",
  },
}));
