import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
      paper:{
            padding:'10px',
            margin:'10px',
            background:'#e8f5e9',
      },
      root: {
            margin: theme.spacing(1),
            padding:'20px',
            background: '#a5d6a7',
      },
      buttonStyle:{
            marginTop:'5px',
            marginBottom:'15px'
      },
      typography:{
            marginLeft:'20px',
      },
      country:{
            background: '#e8f5e9',
            height:'40px',
            width:'100%',
            borderRadius:'5px',
      },
      dialog:{
            maxWidth:'100%',
            maxHeight: '100%',
      },
      switch:{
            display:'flex-end',
      },
      fileInput: {
            width: '97%',
            margin: '10px 0',
      },
      div:{
            padding:'5px',
      },
      text :{
            fontFamily: 'cursive',
          },
      helperTextColor: {
            color: "#d50000",
      },
}));