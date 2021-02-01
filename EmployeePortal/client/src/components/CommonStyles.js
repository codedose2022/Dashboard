import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    [theme.breakpoints.up('md')]: {
        topPadding : {
            paddingTop:'50px'
        }
      },
      
    [theme.breakpoints.down('md')]: {
      topPadding : {
          paddingTop:'40px'
      }
    }

   
    
}))