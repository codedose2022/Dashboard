import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
     appbar:{
        maxWidth:"100%",
       
        [theme.breakpoints.up('sm')]: {
            maxHeight:'50px',
           
          },
          [theme.breakpoints.down('sm')]: {    
            maxHeight:'50px',
           
          }     
      },
    logo: {
         [theme.breakpoints.up('sm')]: {
            maxWidth:"80px",
             maxHeight:"80px",
          
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth:"50px",
             maxHeight:"60px",
          },
          position : 'absolute',
          top : '0px'

          
      },
    root: {
        flexGrow: 1,
      
      },
      menuButton: {
        marginRight: theme.spacing(2),
       
      },
      title: {
        flexGrow: 1,
      },

      fontSizeStyle :{
        fontSize : '0.8rem'
      },
    menuStyleNav : {
      top: '35px',
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    }
})
)