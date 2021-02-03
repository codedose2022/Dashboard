import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    logo: {
      [theme.breakpoints.down('sm')]: {
        maxWidth: '20%',
       
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: '30%',
      },
       
        maxHeight: '80%',

      },
      appbar:{
        background: '#ffffff',
        height: '25%',
        color:'#9e9e9e',   
        display: 'flex',
        marginBottom:'10px'
        
      },
      title:{
        alignSelf: 'flex-end',
        paddingLeft:'6px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
          fontSize:'15px',
         
        },
        [theme.breakpoints.up('md')]: {
          fontSize:'16px', 
        },
        
       
      },
      form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '90%',
        margin : 'auto',
        marginTop: theme.spacing(5), 
      
      },
      input: {
        fontSize: '11px',
        
        },
      root: { 
       
        [theme.breakpoints.between('xs', 'md')]: {
          maxWidth:"100%",
        },
        [theme.breakpoints.up('md')]: {
          maxWidth:"30%",
          marginTop: theme.spacing(20),
        },
    
        margin: '0px auto',
        marginTop: theme.spacing(10), 
    
      },
      buttonStyle:{
        marginTop:'15px',
        marginBottom:'30px'
      },
      
      
      helperTextColor:{
        color:'#d50000',
       
      }
}));
