import React from 'react';
import useStyles from './MyProfileStyles';
import {Paper,Container,Grid,TextField,Avatar,Divider,
        Typography,createMuiTheme,responsiveFontSizes,
        MuiThemeProvider} from '@material-ui/core'; 
import useStyle from '../CommonStyles';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function MyProfile(props) {
    const classes = useStyles(); 
    const classStyle = useStyle(); 
	  let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);
    const state = useSelector(state => state);
    const employeeProfile = _.get(state,'employees.profile','');
    const profileData = props.employee ? props.employee : employeeProfile;
    let dateOfHire = moment(profileData.dateOfHire).format('Do MMMM YYYY');
    let dob = moment(profileData.dob).format('Do MMMM YYYY');

    function getValue (field) {
        const value =  _.get(profileData,field,"");
        if(value) {
            return value;
        }   
    }
return (
	<div>
          {profileData ?  <div>
        <div className={!props.employee ? classStyle.topPadding : ''}/>
        { !props.employee && <Link style = {{ textDecoration: 'none'}} to = "/Dashboard"><h6 className = {classes.linkStyle} >GO TO DASHBOARD</h6></Link> }
        <div className={classStyle.topPadding}/>
			<Container fixed fullwidth="true" maxWidth="md">
			<Paper className={classes.root}  elevation={2}>
			<Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} container>
						<Grid  item xs={12}>
					 	<Paper className={classes.firstPaper} elevation={5}>
						<Container className={classes.container}> 
                    		<Avatar src={profileData.selectedFile}  className={classes.image} />
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
                    size="small"
					fullWidth
                    id="firstName"
                    label="First Name"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true   
                    }}
                    variant='filled'
                    value={getValue('firstName')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                 <TextField
                    size="small"
				    fullWidth
                    id="lastName"
                    label="Last Name"
                    InputProps={{
                    readOnly: true,
                    disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('lastName')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                    fullWidth
                    size="small"
                    id="email"
                    label="Email"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('email')}
                />
                </Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                    fullWidth
                    size="small"
                    id="employeeCode"
                    label="Employee Code"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('employeeCode')}
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
                    size="small"
                    id="designation"
                    label="Designation"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('designation')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                 <TextField
                    fullWidth
                    size="small"
                    id="department"
                    label="Department"
                    InputProps={{
                    readOnly: true,
                    disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('department')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                    fullWidth
                    size="small"
                    id="dateOfHire"
                    label="Date of Hire"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={dateOfHire}
                />
                </Grid>              
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
				    fullWidth
                    id="deskPhone"
                    size="small"
                    label="Desk Phone"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('deskPhone')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                    fullWidth
                    size="small"
                    id="workMobile"
                    label="Work Mobile"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('workMobile')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                    fullWidth
                    size="small"
                    id="nationality"
                    label="Nationality"  
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('nationality')}
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
                    size="small"
                    id="phoneNumber"
                    label="Phone Number"                   
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('phoneNumber')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                 <TextField
                    fullWidth
                    size="small"
                    id="dob"
                    label="Date of Birth"                   
                    InputProps={{
                    readOnly: true,
                    disableUnderline: true
                    }}
                    variant="filled"
                    value={dob}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                    fullWidth
                    size="small"
                    id="dietPath"
                    label="Diet Path"                   
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('dietPath')}
                />
                </Grid>         
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                    fullWidth
                    size="small"
                    id="gender"
                    label="Gender"                   
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('gender')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                    fullWidth
                    size="small"
                    id="maritalStatus"
                    label="Marital Status"                  
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('maritalStatus')}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                    fullWidth
                    size="small"
                    id="hobbies"
                    label="Hobbies"                   
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                    value={getValue('hobbies')}
                />
                </Grid>               
                </Grid>
				</Paper>
				</Grid>
				<Grid item sm={12}>
				<Paper className={classes.paper}>
				
                <Grid item sm={12}>
					<Typography variant="h6"  >Dependence</Typography>
					<Divider />
				</Grid>
				
              
                
                {profileData.dependenceDetails ? profileData.dependenceDetails.map((dependence,index)=>(<div key={index}>
                
                 <TextField
                    className={classes.div}
                    size="small"
                    id="dependenceName"
                    label="Name"
                    defaultValue={dependence?dependence.dependenceName:""}
                    InputProps={{
                    readOnly: true,
                    disableUnderline: true
                    }}
                    variant="filled"
                />
                
                <TextField
                    className={classes.div}
                    size="small"
                    id="dependenceRelationship"
                    label="Relationship"
                    defaultValue={dependence?dependence.dependenceRelationship:""}
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                />
               
                <TextField
                    className={classes.div}
                    size="small"
                    id="dependenceDob"
                    label="Date of Birth"
                    defaultValue={dependence?moment(dependence.dependenceDob).format('Do MMMM YYYY'):""}
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true
                    }}
                    variant="filled"
                />
                
                </div>)): ""}
               
						</Paper>
					</Grid>
				</Grid>
			</Grid>
			</Paper>
			</Container> </div> : "loading" }
	</div>
	);
};
  

