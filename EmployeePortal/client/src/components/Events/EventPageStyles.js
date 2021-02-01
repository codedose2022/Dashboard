import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  topMargin: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
    },
  },
  addButtonStyle: {
    fontSize: "0.59rem",
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(15),
      marginTop: theme.spacing(7),
    },
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(7),
    },
  },

  paper: {
    margin: "0px auto",
    borderRadius: "10px",
    background: "#81c78429",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80%",
      marginTop: theme.spacing(2),
    },
  },

  header: {
    display: "flex",
    height: "5vh",
    justifyContent: "space-between",
  },
  chip: {
    borderRadius: "0",
    width: "100px",
  },

  marginStyle: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "8px",
      marginRight: "8px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "15px",
      marginRight: "15px",
    },
  },
  box: {
    fontSize: "0.85rem",
    color: "#7b0000",
    //  fontWeight: "bold",
    fontFamily: "cursive",
  },
  iconVertical: { background: "none", paddingRight: "30px", color: "black" },

  img: {
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: "250px",
    },

    [theme.breakpoints.up("sm", "md")]: {
      width: "600px",
      objectFit: "contain",
    },
  },
  tableCellStyle: {
    fontSize: "0.7rem",
  },

  CaptionPadding: {
    [theme.breakpoints.down("md")]: {
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: "20px",
      paddingBottom: "20px",
    },
  },

  textEditor: {
    [theme.breakpoints.down("xs")]: {
      width: "200px",
      marginTop: "30px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: "230px",
      marginTop: "30px",
    },

    [theme.breakpoints.up("sm", "md")]: {
      width: "500px",
      objectFit: "contain",
    },
  },

  textAreaStyle: {
    backgroundColor: "#f3ede5",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: "250px",
    },

    [theme.breakpoints.up("sm", "md")]: { width: "500px", marginTop: "20px" },
  },
  helperTextColor: {
    color: "#d50000",
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  fileInputStyle: {
    marginTop: "30px",
  },
  paddingZero: {
    padding: "0px",
  },
  fontSizeSmall: {
    fontSize: "small",
  },
  fontSizeSmaller: {
    fontSize: "x-small",
  },
  alignment: {
    paddingLeft: "10px",
    fontSize: "smaller",
    color: "rgb(0 0 0 / 63%)",
  },
  repliesStyle: {
    [theme.breakpoints.down("md")]: {
      paddingBottom: "10px",
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: "20px",
    },
  },
}));
