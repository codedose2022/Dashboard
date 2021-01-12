import React,{useState} from 'react';
import useStyles from './AddEmployeeStyles';
import FileBase from 'react-file-base64';
import { green,grey} from '@material-ui/core/colors';
import {useDispatch} from 'react-redux';
import { CountryDropdown } from 'react-country-region-selector';
import { createEmployee } from '../actions/employees';
import {useHistory} from 'react-router-dom';
import * as api from '../api';
import Alert from '@material-ui/lab/Alert';
import {Paper,Grid,TextField,Divider,createMuiTheme,ThemeProvider,InputLabel,FormControl,Typography,MenuItem,Button,Select, ClickAwayListener} from '@material-ui/core'; 
export default function MyProfile() {

    let token = localStorage.getItem("auth-token");
    const history = useHistory();
    const dispatch = useDispatch();
    const theme = createMuiTheme({ 
        palette: {
          primary:{
            main: green[900], 
          },
          secondary:{
            main: grey[500], 
          },
        },
      })

    const departments = [
    {
        departmentName: "IT Department",
        department: "IT",
        designationList: [
        {
            designationName: "Software Developer",
            designation: "IT1"
        },
        {
            designationName: "Database Administrator",
            designation: "IT2"
        }
        ]
    },
    {
        departmentName: "ESP Operations",
        department: "ESP",
        designationList: [
            {
                designationName: "Associate",
                designation: "ESP1"
            },
            {
                designationName: "Lead",
                designation: "ESP2"
            }
        ]
    },
    {
        departmentName: "Client Relations",
        department: "CR",
        designationList: [
            {
                designationName: "Junior",
                designation: "CR1"
            },
            {
                designationName: "Senior",
                designation: "CR2"
            }
        ]
    },
    {
        departmentName: "Technical",
        department: "TE",
        designationList: [
            {
                designationName: "Manager",
                designation: "TE1"
            },
            {
                designationName: "Data Entry",
                designation: "TE2"
            }
        ]
    },
    {
        departmentName: "Support Staff",
        department: "SS",
        designationList: [
            {
                designationName: "House Keeping",
                designation: "SS1"
            },
            {
                designationName: "Office Assistant",
                designation: "SS2"
            }
        ]
    }
    ];
  
    const classes = useStyles(); 
    const [addEmployee, setAddEmployee] = useState({
        firstName:'',
        lastName:'',
        email:'',
        employeeCode:'',
        dateOfHire:'',
        deskPhone:'',
        workMobile:'',
        phoneNumber:'',
        dob:'',
        hobbies:'',
        gender:'',
        dietPath:'',
        maritalStatus:'',
        designation:'',
        department:'',
        division:'',
        nationality:'',

    });
    console.log(addEmployee);

    const clear = () => {
        setAddEmployee({
            firstName:'',
            lastName:'',
            email:'',
            employeeCode:'',
            dateOfHire:'',
            deskPhone:'',
            workMobile:'',
            phoneNumber:'',
            dob:'',
            hobbies:'',
            gender:'',
            dietPath:'',
            maritalStatus:'',
            designation:'',
            division:'',
            nationality:'',
            department:'',
        });
      };

    const [status, setStatus] = useState('');
    const handleSubmit = async (e) =>{
        e.preventDefault();

    try {
     
        await api.createEmployee(token,addEmployee).then(data =>{
            console.log(data.data);
            if(data.data.messages.status === '14')
            {
                dispatch ({type: 'CREATE_EMPLOYEE', payload: data.data.employees}) 
                setStatus(data.data.messages.message);
                history.push('/dashboard');
            }
            if(data.data.messages.status ==='13')
            {
                setStatus(data.data.messages.message);
            }


        })
     
        
        } 
    catch (error) {
        console.log(error);
    }
            
    }

return(
    <div>
        <form className={classes.form} noValidate autoComplete="off" onSubmit = {handleSubmit}>
        <Paper className={classes.root}  elevation={10}> 
        {status && 
          <Alert severity="error"> {status} </Alert>  
          }
        <ThemeProvider theme={theme}>
        <Paper className={classes.paper} elevation={5}>
        <Typography variant="h6" align="center" className={classes.typography} >ADD EMPLOYEE</Typography>
			<Grid>			
				<Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" >Employee Details</Typography>
                        <Divider />
				    </Grid>
				</Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                        <TextField
                            fullWidth
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            value={addEmployee.firstName} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, firstName : e.target.value}))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                        <TextField
                            fullWidth
                            required
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            value={addEmployee.lastName} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, lastName : e.target.value}))}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={addEmployee.email} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, email : e.target.value}))}
                        />
                    </Grid>
                
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="employeeCode"
                            label="Employee Code"
                            variant="outlined"
                            value={addEmployee.employeeCode} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, employeeCode : e.target.value}))}
                        />
                       
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                       
                         <CountryDropdown  
                         required
                         value={addEmployee.nationality} 
                         onChange={(e) => setAddEmployee({ ...addEmployee, nationality : e})}
                         className={classes.country} />
                        
                       
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" >Work Details</Typography>
                        <Divider />
				    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <FormControl  variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel required id="department">Department</InputLabel>
                            <Select 
                            fullWidth
                            label="department"
                            id="department"
                            value={addEmployee.department}
                            onChange={(e) => (setAddEmployee({ ...addEmployee, department : e.target.value}))}
                            >
                            {departments.map((department) => (
                                <MenuItem
                                value={department.departmentName}
                                key={department.department}
                                >
                                {department.departmentName}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >  
                        <FormControl  variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel required id="designation">Designation</InputLabel>
                            <Select 
                            fullWidth
                            label="designation"
                            id="designation"
                            value={addEmployee.designation}
                            onChange={(e) => (setAddEmployee({ ...addEmployee, designation : e.target.value}))}
                            disabled={!addEmployee.department}
                            >
                            {addEmployee.department
                                ? departments
                                    .find(({ departmentName }) => departmentName === addEmployee.department)
                                    .designationList.map((designation) => (
                                    <MenuItem value={designation.designationName} key={designation.designation}>
                                        {designation.designationName}
                                    </MenuItem>
                                    ))
                                : []}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >  
                                        
                    <TextField 
                            fullWidth
                            id="division" 
                            required
                            label="Division" 
                            value={addEmployee.division} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, division : e.target.value}))}
                            variant="outlined" select>
                            <MenuItem value="EV">Events Committe</MenuItem>
                            <MenuItem value="ED">Editorial Committe</MenuItem>
                            <MenuItem value="EE">Employee</MenuItem>
                        </TextField>
                       
                        </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="dateOfHire"
                            type="date"
                            label="Date of Hire"
                            value={addEmployee.dateOfHire} 
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            onChange={(e) => (setAddEmployee({ ...addEmployee, dateOfHire : e.target.value}))}
                            />
                     </Grid>
                
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            id="deskPhone"
                            label="Desk Phone"
                            type="number"
                            variant="outlined"
                            value={addEmployee.deskPhone} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, deskPhone : e.target.value}))}
                            />
                     </Grid>

                     <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            id="workMobile"
                            label="Work Mobile"
                            type="number"
                            variant="outlined"
                            value={addEmployee.workMobile} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, workMobile : e.target.value}))}
                            />
                     </Grid>
                     <Grid item xs={12}>
                        <Typography variant="subtitle1" >Personal Details</Typography>
                        <Divider />
				    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField 
                            fullWidth 
                            required
                            id="gender" 
                            label="Gender" 
                            defaultValue="" 
                            value={addEmployee.gender} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, gender : e.target.value}))}
                            variant="outlined" select>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField 
                            fullWidth 
                            required
                            id="maritalStatus" 
                            label="Marital Status" 
                            defaultValue="" 
                            value={addEmployee.maritalStatus} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, maritalStatus : e.target.value}))}
                            variant="outlined" select>
                            <MenuItem value="Married">Married</MenuItem>
                            <MenuItem value="Single">Single</MenuItem>
                        </TextField>
                    </Grid>
                     <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="phoneNumber"
                            label="Personal Mobile Number"
                            variant="outlined"
                            type="number"
                            value={addEmployee.phoneNumber} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, phoneNumber : e.target.value}))}
                            />
                     </Grid>

                     <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="dob"
                            type="date"
                            label="Date of Birth"
                            variant="outlined"
                            value={addEmployee.dob} 
                            InputLabelProps={{
                                shrink: true,
                              }}
                            onChange={(e) => (setAddEmployee({ ...addEmployee, dob : e.target.value}))}
                            />
                     </Grid>

                     <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            id="hobbies"
                            label="Hobbies"
                            variant="outlined"
                            value={addEmployee.hobbies} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, hobbies : e.target.value}))}
                            />
                     </Grid>

                   

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField 
                            fullWidth 
                            required
                            id="dietPath" 
                            label="Diet Path" 
                            defaultValue="" 
                            value={addEmployee.dietPath} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, dietPath : e.target.value}))}
                            variant="outlined" select>
                            <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                            <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" >Add Profile Photo</Typography>
                        <Divider />
				    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    
                        
                        <FileBase  
                            className={classes.country}
                            type="file" 
                            multiple={false} 
                            onDone={({ base64 }) => setAddEmployee({ ...addEmployee, selectedFile: base64 })} 
                        />
                    
              
                    </Grid>

                </Grid>
               
            </Grid>   
		</Paper>
       

       

        <Grid>   
        <Grid container spacing={6}>
                    <Grid item xs={6} sm={6} md={3} lg={3} xl={3} > 
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3} xl={3} > 
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3} xl={3} >                        
                    <Button className ={classes.buttonStyle}
              variant={'contained'} 
              fullWidth 
              disableElevation
              color={'secondary'}
              onClick={clear}
              >
                           Reset
                        </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3} xl={3} >                        
                        <Button className ={classes.buttonStyle}
              variant={'contained'} 
              fullWidth 
              disableElevation
              color={'primary'}
              type="submit"
              >
                ADD
              </Button>
                        </Grid>
                            </Grid>
                            </Grid>
        
        </ThemeProvider>
		</Paper> 	
        </form>
    </div>
    
    );
};
