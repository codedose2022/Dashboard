import React from 'react';
import useStyles from './MyProfileStyles';
import {Paper,Container,Grid,TextField,Avatar,Divider,
    Typography,createMuiTheme,responsiveFontSizes,MuiThemeProvider,Button} from '@material-ui/core'; 
import  profile from '../images/profile.jfif';
import useStyle from './CommonStyles';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function MyProfile() {

    const classes = useStyles(); 
    const classStyle = useStyle(); 
	let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);
    const state = useSelector(state => state);
    const profileData = _.get(state,'employees.profile','');
    let dateOfHire = moment(profileData.dateOfHire).format('Do MMMM YYYY');
    let dob = moment(profileData.dob).format('Do MMMM YYYY');
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
									{profileData.firstName + " " + profileData.lastName}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography  variant="subtitle1" className={classes.typography1} >
									{profileData.employeeCode}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="subtitle1" className={classes.typography1}>
									{profileData.designation}
									</Typography>
								</Grid>
								<Grid item xs={12}>	
									<Typography variant="subtitle1" className={classes.typography1}>
									{profileData.department}
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
                    id="firstName"
                    label="First Name"
                   
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.firstName}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                 <TextField
				    fullWidth
                    id="lastName"
                    label="Last Name"
                    
                    InputProps={{
                    readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.lastName}
                />
                </Grid>
             
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
				fullWidth
                    id="email"
                    label="Email"
                   
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.email}
                />
                </Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
				fullWidth
                    id="employeeCode"
                    label="Employee Code"
                   
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.employeeCode}
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
                    id="designation"
                    label="Designation"
                 
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.designation}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                 <TextField
				 fullWidth
                    id="department"
                    label="Department"
                  
                    InputProps={{
                    readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.department}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="dateOfHire"
                    label="Date of Hire"
                   
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={dateOfHire}
                />
                </Grid>
               
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="deskPhone"
                    label="Desk Phone"
                   
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.deskPhone}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="workMobile"
                    label="Work Mobile"
                    
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.workMobile}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="employeeStatus"
                    label="Employee Status"
                   
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.employeeStatus}
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
                    id="phoneNumber"
                    label="Phone Number"
                    
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.phoneNumber}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                 <TextField
				 fullWidth
                    id="dob"
                    label="Date of Birth"
                    
                    InputProps={{
                    readOnly: true,
                    }}
                    variant="filled"
                    value={dob}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="nationality"
                    label="Nationality"
                    
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.nationality}
                />
                </Grid>
             
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="gender"
                    label="Gender"
                    
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.gender}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="maritalStatus"
                    label="Marital Status"
                    
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.maritalStatus}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				fullWidth
                    id="hobbies"
                    label="Hobbies"
                    
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={profileData.hobbies}
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
                    id="dependenceName"
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
                    id="dependenceRelationship"
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
                    id="dependenceDob"
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
                    id="dependenceName1"
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
                    id="dependenceRelationship1"
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
                    id="dependenceDob1"
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
  

