import { CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
  img:{
    [theme.breakpoints.down('xs')]: {
      width: "100px"
    },
    [theme.breakpoints.between('xs','sm')]: {
      width: "150px"
    },      
    [theme.breakpoints.up('sm','md')]: 
      {width: "150px",height: "150px",objectFit: 'contain'},   
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