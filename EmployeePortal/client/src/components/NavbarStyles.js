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
            maxWidth:"70px",
             maxHeight:"90px",
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth:"50px",
             maxHeight:"60px",
          }
      
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

})
)