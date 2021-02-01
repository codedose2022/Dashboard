import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    logo: {
        maxWidth: '20%',
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
      
      },
      input: {
        fontSize: '11px',
        
        },
      root: { 
        [theme.breakpoints.between('xs', 'sm')]: {
          maxWidth:"100%",
        },
        [theme.breakpoints.between('sm', 'md')]: {
          maxWidth:"50%",
        },
        [theme.breakpoints.between('md', 'lg')]: {
          maxWidth:"70%",
        },
        [theme.breakpoints.up('md')]: {
          maxWidth:"30%",
      
          marginTop: theme.spacing(20)
        },
        margin: '0px auto',
        marginTop: theme.spacing(10), 
    
      },
      buttonStyle:{
        marginTop:'5px',
        marginBottom:'15px'
      },
      
      
      helperTextColor:{
        color:'#d50000',
       
      }
}));
