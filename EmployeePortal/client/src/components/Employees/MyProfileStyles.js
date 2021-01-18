import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  div:{ 
   padding:'5px',
  },
  firstPaper:{
    padding:'10px',
    background: '#81c784',
  },
  paper:{
    padding:'10px',
    // background: '#e8f5e9',
  },
  typography:{
    padding:'3px',
    marginLeft:'5%',
    marginTop:'2%',
    
  },
  typography1:{
    padding:'3px',
    marginLeft:'5%',
   
 },
  container:{
    textAlign: 'center',
    marginTop:'1%',
    [theme.breakpoints.up('md')]: {
      display:'flex',
      textAlign: 'start',
       marginLeft:'5%'
    },
  },
  image: {
    marginLeft:'27%',
    [theme.breakpoints.down('sm')]: {
      width: '45%',
      height:'45%',
     
    },
    [theme.breakpoints.up('md')]: {
      width: '15%',
      height:'15%', 
    },
    
  },

  linkStyle : {
    color : '#1b5e20',
    paddingLeft : '30px',
   
  }
 
}));