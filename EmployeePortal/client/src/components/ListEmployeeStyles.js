
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    
    [theme.breakpoints.between('xs', 'md')]: {
      maxWidth:"100%",
    },
   
    [theme.breakpoints.up('md')]: {
      maxWidth:"90%",
  
      
    },
    margin: '0px auto',
    marginTop: theme.spacing(1)
  },
  addButtonStyle : {
    marginTop: theme.spacing(1),
    fontSize: '0.59rem',
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(8)
    },
    
  },
  tableHeadStyle:{
    fontWeight: 'bold',
    fontSize: '0.79rem'
  },
  tableCellStyle:{
    fontSize: '0.7rem'
  },
  
  tableBorder:{
    borderColor: 'green',borderStyle: 'solid', borderWidth: 0.2,borderBottom : 0
   
  },
  tableBorderStyle:{
    borderColor: 'green',borderStyle: 'solid', borderWidth : 0.2,borderTopWidth : 0,

   
  },
  selectDropdown: { color: "#fff", backgroundColor: "#1b1f38" },
  
  toolbar: {
    backgroundColor: "white"
  },
  caption: {
    fontSize:'0.7rem'
  },
}));