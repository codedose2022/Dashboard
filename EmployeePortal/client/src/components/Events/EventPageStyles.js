import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

 
  addButtonStyle : {
    marginTop: theme.spacing(1),
    fontSize: '0.59rem',
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(15)
    },
    
  },

    paper : {
      margin: '0px auto',
    
      [theme.breakpoints.down('md')]: {
        maxWidth:"100%",
        marginTop: theme.spacing(5)
      
      },
      [theme.breakpoints.up('md')]: {
        maxWidth:"80%",
        marginTop: theme.spacing(4),
      
      },
    },

    header :{
      display: 'flex',
      height: '5vh',
      justifyContent: 'space-between'
    },
    chip:{
      borderRadius: '0',
      width: '100px'
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
    box : {
      fontSize : '0.85rem',
      color : 'grey'
    },
    iconVertical : {"background":"none" ,paddingRight:"30px",color : 'black'},

    img:{
      
      [theme.breakpoints.down('xs')]: {
        width: "200px"
        },
        [theme.breakpoints.between('xs','sm')]: {
          width: "250px"
          },
          
        [theme.breakpoints.up('sm','md')]: 
          {width: "600px",objectFit: 'contain'},
        
    },
    tableCellStyle:{
      fontSize: '0.7rem'
    },

    CaptionPadding : {

      [theme.breakpoints.down('md')]: {

        paddingTop : "10px",
        paddingBottom : "10px"
        
        },
        [theme.breakpoints.up('md')]: {
          paddingTop : "20px",
          paddingBottom : "20px"
        },
   
    },


      textEditor:{
      
      [theme.breakpoints.down('xs')]: {
        width: "200px"
        },
        [theme.breakpoints.between('xs','sm')]: {
          width: "250px"
          },
          
        [theme.breakpoints.up('sm','md')]: 
          {width: "500px",objectFit: 'contain'},
        
    },

    textAreaStyle : {
      [theme.breakpoints.down('xs')]: {
        width: "200px"
        },
        [theme.breakpoints.between('xs','sm')]: {
          width: "250px"
          },
          
        [theme.breakpoints.up('sm','md')]: 
          {width: "500px", marginTop:"20px"},
    },
    helperTextColor:{
      color:'#d50000',
    }
  
}))