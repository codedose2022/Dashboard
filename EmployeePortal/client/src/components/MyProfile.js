import React from 'react';
import useStyles from './MyProfileStyles';
import {Paper,Container,Grid,TextField,Avatar,Divider,
    Typography,createMuiTheme,responsiveFontSizes,MuiThemeProvider,Button} from '@material-ui/core'; 
import  profile from '../images/profile.jfif';
import useStyle from './CommonStyles';
import {Link} from 'react-router-dom';

export default function MyProfile() {

    const classes = useStyles(); 
    const classStyle = useStyle(); 
	let theme = createMuiTheme();
	theme = responsiveFontSizes(theme);

	const displayName = "Dummy Name";
	const displayEmpCode = "ABC124";
	const displayDesignation = "Software Developer";
	const displayDepartment = "IT Department";
	  

	return (
		<div>

        <div className={classStyle.topPadding}/>
        <Button><Link to = "/Dashboard"><h5>Go to Dashboard</h5></Link></Button>
        <div className={classStyle.topPadding}/>
			<Container fixed >
			<Paper className={classes.root}  elevation={9}>
			<Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} container>
						<Grid  item xs={12}>
					 	<Paper className={classes.firstPaper} elevation={5}>
						<Container className={classes.container}> 
                    		<Avatar src={profile}  className={classes.image} />
							<MuiThemeProvider theme={theme}>
							<Grid>
							<Grid container spacing={0}>
								<Grid item xs={12}> 
									<Typography variant="h6"  className={classes.typography} >
									{displayName}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography  variant="subtitle1" className={classes.typography1} >
									{displayEmpCode}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="subtitle1" className={classes.typography1}>
									{displayDesignation}
									</Typography>
								</Grid>
								<Grid item xs={12}>	
									<Typography variant="subtitle1" className={classes.typography1}>
									{displayDepartment}
									</Typography>
								</Grid>
							</Grid>
							</Grid>
							</MuiThemeProvider>
						</Container>
						</Paper>
						</Grid>
						
					</Grid>
					
					<Grid item xs={12}>
						<Paper className={classes.paper} elevation={5}>
						
						<Grid container spacing={2}>
                <Grid item xs={12}>
					<Typography variant="h6" >Basic Info</Typography>
					<Divider />
					</Grid>
					</Grid>

                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
					fullWidth
                    id="outlined-read-only-input"
                    label="First Name"
                    defaultValue="Alice"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                 <TextField
				    fullWidth
                    id="outlined-read-only-input"
                    label="Last Name"
                    defaultValue="Wonderland"
                    InputProps={{
                    readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
             
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Email"
                    defaultValue="demo@gmail.com"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Employee Code"
                    defaultValue="E1234"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                </Grid>
               
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
						<Grid container spacing={2}>
                <Grid item sm={12}>
					<Typography variant="h6" >Work</Typography>
					<Divider  />
					</Grid>
					</Grid>

                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Designation"
                    defaultValue="Software Developer"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                 <TextField
				 fullWidth
                    id="outlined-read-only-input"
                    label="Department"
                    defaultValue="IT Department"
                    InputProps={{
                    readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Date of Hire"
                    defaultValue="12-12-2020"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
               
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Desk Phone"
                    defaultValue="5521"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Work Mobile"
                    defaultValue="05061165265"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Employee Status"
                    defaultValue="Active"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                
                </Grid>
						</Paper>
					</Grid>
					<Grid item sm={12}>
						<Paper className={classes.paper}>
						<Grid container spacing={2}>
                <Grid item sm={12}>
					<Typography variant="h6" >Personal Details</Typography>
					<Divider  />
					</Grid>
					</Grid>

                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Phone Number"
                    defaultValue="+971 508011945"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                 <TextField
				 fullWidth
                    id="outlined-read-only-input"
                    label="Date of Birth"
                    defaultValue="2017-05-24"
                    InputProps={{
                    readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Nationality"
                    defaultValue="Indian"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
             
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Gender"
                    defaultValue="Male"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Marital Status"
                    defaultValue="Married"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Hobbies"
                    defaultValue="Dancing"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                
                </Grid>
						</Paper>
					</Grid>
					<Grid item sm={12}>
						<Paper className={classes.paper}>
						<Grid container spacing={2}>
                <Grid item sm={12}>
					<Typography variant="h6"  >Dependence</Typography>
					<Divider />
					</Grid>
					</Grid>

                <Grid container spacing={2}>
               
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                 <TextField
				 fullWidth
                    id="outlined-read-only-input"
                    label="Name"
                    defaultValue="Ben"
                    InputProps={{
                    readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Relationship"
                    defaultValue="Dog"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
				<Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Date of Birth"
                    defaultValue="12-12-2020"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
            
               
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Name"
                    defaultValue="Lucy"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Relationship"
                    defaultValue="Cat"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
				<Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="outlined-read-only-input"
                    label="Date of Birth"
                    defaultValue="12-12-2020"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                </Grid>
                
                </Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
			</Paper>
			</Container>
		</div>
	  );
  };
  

