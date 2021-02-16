import { CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    padding:"10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  img: {
    [theme.breakpoints.down("xs")]: {
      width: "100px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: "150px",
    },
    [theme.breakpoints.up("sm", "md")]: {
      width: "150px",
      height: "150px",
      objectFit: "contain",
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
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
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    // flexGrow: 1,
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
    marginBottom : '14px'
  },
  cardActions : {
    marginLeft: '20px',
    justifyContent: 'space-between',

  }
  
}))