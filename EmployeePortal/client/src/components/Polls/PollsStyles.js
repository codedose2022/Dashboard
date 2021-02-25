import { red } from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%"
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: '75%',
      maxHeight: '100%',
      padding:"10px",
      margin: '0px auto'
    },
    borderRadius:'10px',
  },
  
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  img: {
    objectFit: "cover",
    width: "100%",
        height: "100%",
  },
  expand: {
    marginLeft: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft:'0px',
    paddingRight:'0px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    padding:'25px',
  },
  header :{
    justifyContent: 'space-between',
    fontFamily: 'cursive',
  },
  text :{
    fontFamily: 'cursive',
  },
  marginStyle : {
    [theme.breakpoints.down('md')]: {
      marginLeft : "8px",
      marginRight : "8px"
    },
    [theme.breakpoints.up('md')]: {
      marginLeft : "15px",
      marginRight : "15px"
    },
  },  
  helperTextColor: {
    color: "#d50000",
  },
  buttonStyle : {
    fontSize: "0.59rem",
    marginBottom : '14px',
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(13.4),
     
    },
  },
  headingSize : {
    fontSize: "12px",
  },
  qStyles : {
    marginBottom:'5px',
    color: "#524f4fcc",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
  }
}))