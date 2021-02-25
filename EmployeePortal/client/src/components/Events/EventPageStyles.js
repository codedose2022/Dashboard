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
      marginRight: theme.spacing(23.5),
     
    },
    
  },

  paper: {
    margin: "0px auto",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "70%",
      marginTop: theme.spacing(2),
    },
  },

  header: {
    display: "flex",
    height: "5vh",
    justifyContent: "space-between",
  },
  chip: {
    borderRadius: "0px",
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
    fontSize: "0.9rem",
    color: "#524f4fcc",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    justifyContent: "space-between",
  },
  desc: {
    fontSize: "0.85rem",
    color: "#524f4fcc",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
  },
  iconVertical: { background: "none", paddingRight: "30px", color: "black" },

  img: {
    maxWidth: "-webkit-fill-available",
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
    color : '#524f4fcc',
    fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    fontSize: "small",
  },
  fontSizeSmaller: {
    fontSize: "x-small",
  },
  alignment: {
    paddingLeft: "10px",
    fontSize: "smaller",
    color: "rgb(132 123 123 / 67%)",
  },
  repliesStyle: {
    cursor: "pointer",
  },
  topPaddingStyle: {
    paddingTop: "10px",
  },
  readMoreLink: {
    textDecoration: "none",
    color: "#8080808c",
    cursor : 'pointer'
  },
  input : {
    fontSize : '.8rem'
  },
  cardGrid: {
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(6)
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(8)
    },
  },
  iconStyles : {
    fontSize: 18 
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  imgRequired : {
       
        color: '#d50000',
        margin: '0px',
        fontSize: '0.75rem',
        marginTop: '3px',
        textAlign: 'left',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: '400',
        lineHeight: '1.66',
        letterSpacing: '0.03333em'
  }
}));
