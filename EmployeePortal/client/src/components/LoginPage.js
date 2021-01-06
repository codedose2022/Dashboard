import React, { useState,useEffect} from 'react';
    import { AppBar, Toolbar, Typography, Button, Box, 
      createMuiTheme,ThemeProvider,Link,Grid  } from "@material-ui/core";
    import Mersatlogo from '../images/Mersatlogo.jpg'
    import TextField from '@material-ui/core/TextField';
    import { green} from '@material-ui/core/colors';
    import useStyles from './LoginPageStyles';
    import CssBaseline from '@material-ui/core/CssBaseline';
    import {useDispatch,useSelector} from 'react-redux';
    import { login } from '../actions/employees';
    import _ from 'lodash';   
    import {useHistory} from 'react-router-dom'; 

    


    const theme = createMuiTheme({ 
      palette: {
        primary:{
          main: green[900], 
        },
      },
    })

  
   export default function LoginPage() {
    const classes = useStyles();
    const history = useHistory();
    const [loginData, setLoginData] = useState({
      email : '', password : ''
    });
    const [emailRequired, setEmailRequired] = useState('');
    const [passwordRequired, setPasswordRequired] = useState('');
    const state = useSelector(state => state)
    console.log(state)
    const loggedIn = _.get(state,'employees.loggedInStatus','');
    console.log(loggedIn)

  
   

    const dispatch = useDispatch();

    
    useEffect(() => {
console.log("in use")
      if(loggedIn === 'loggedIn'){
        history.push('/dashboard');
      }
      
    }, [loggedIn])
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(loginData.email === ''){
          setEmailRequired("Please enter the email address");     
        }
        if(loginData.password === ''){
          setPasswordRequired( "Please enter the password");
        }
        if(loginData.email !== '' && loginData.password !== ''){
          dispatch(login(loginData));
          clearFieldError();
        }
      
               
    }
   
    useEffect(() => {
      if(loginData.email !== ''){
        setEmailRequired("");   
      }
      if(loginData.password !== ''){
        setPasswordRequired( "");
      }
      
    }, [loginData.email, loginData.password])

    

    const clearFieldError = () =>{
      setEmailRequired("");   
      setPasswordRequired("");
    }
     
   
       
      return(
      
        <Box  boxShadow={3} className={classes.root}>
          <ThemeProvider theme ={theme}>
            <AppBar position="static" className={classes.appbar} elevation={0}>
              <Toolbar>
                <img src={Mersatlogo} alt = "Mersatlogo" className={classes.logo} />
                <Typography className={classes.title} variant="body2" >
                  EMPLOYEE PORTAL LOGIN
                </Typography>
              </Toolbar>
            </AppBar>
            <CssBaseline/>
          
          <form autoComplete="off" className={classes.form} onSubmit = {handleSubmit} >
            <TextField
              InputProps={{
                  disableUnderline: true,
                  classes: { input: classes.input } 
                }}
                variant="filled"
                margin="normal"
                fullWidth
                id="email"
                placeholder="EMAIL ADDRESS"
                name="email"       
                size="small"
                value={loginData.email}
                
                helperText = {emailRequired}  
                onChange={(e) => (setLoginData({ ...loginData, email : e.target.value}))}
        
              />
              <TextField
              InputProps={{
                  disableUnderline: true,
                  classes: { input: classes.input } 
                }}    
                variant="filled"
               
                fullWidth
                size="small"
                margin="normal"
                name="password"
                placeholder="PASSWORD"
                type="password"
                id="password"
                helperText = {passwordRequired}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password : e.target.value})}
              />
              <Button className ={classes.buttonStyle}
              variant={'contained'} 
              fullWidth 
              disableElevation
              color={'primary'}
              type="submit"
              >
                LOGIN
              </Button>
              <Grid className ={classes.buttonStyle}
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
              >
              <Link href="#" variant="caption"> 
                    Forgot password
                  </Link>
              </Grid>
              
          </form>
         
         
          </ThemeProvider>
        </Box>
      )
    }
  
