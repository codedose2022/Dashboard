import React,{useState} from 'react';
import useStyles from './AddEmployeeStyles';
import FileBase from 'react-file-base64';
import { green,grey} from '@material-ui/core/colors';
import {Paper,Grid,TextField,Divider,createMuiTheme,ThemeProvider,InputLabel,FormControl,Typography,MenuItem,Button,Select} from '@material-ui/core'; 
export default function MyProfile() {

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
        employeeStatus:'',
        designation:'',
        division:'',
        nationality:'',

    });
    console.log(addEmployee);

    const clear = () => {
        setAddEmployee({
            
            
        // firstName:'',
        // lastName:'',
        // email:'',
        // employeeCode:'',
        // dateOfHire:'',
        // deskPhone:'',
        // workMobile:'',
        // phoneNumber:'',
        // dob:'',
        // hobbies:'',
        // gender:'',
        // dietPath:'',
        // maritalStatus:'',
        // employeeStatus:'',
        // designation:'',
        // division:'',
        // nationality:'',
 });
      };

return(
    <div>
        <Paper className={classes.root}  elevation={10}> 
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
                        required
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
                        <TextField
                            fullWidth
                            required
                            id="nationality"
                            label="Nationality"
                            variant="outlined"
                            value={addEmployee.nationality} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, nationality : e.target.value}))}
                        />
                       
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" >Work Details</Typography>
                        <Divider />
				    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        {/* <FormControl className={classes.formControl}> */}
                        {/* <InputLabel  htmlFor="designation">Designation</InputLabel> */}
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="designation">Designation</InputLabel>
   
                            <Select  
                            native 
                            fullWidth
                            id="designation"
                            value={addEmployee.designation} 
                            label="Designation"
                            onChange={(e) => (setAddEmployee({ ...addEmployee, designation : e.target.value}))}
                            >
                            <option aria-label="Designation" value="" />
                            <optgroup label="IT Department">
                                <option value={1}>Software Developer</option>
                                <option value={2}>Database Administrator</option>
                            </optgroup>
                            <optgroup label="ESP Operations">
                                <option value={3}>Associate</option>
                                <option value={4}>Lead</option>
                            </optgroup>
                            <optgroup label="Client Relations">
                                <option value={5}>Junior</option>
                                <option value={6}>Senior</option>
                            </optgroup>
                            <optgroup label="Technical">
                                <option value={7}>Manager</option>
                                <option value={8}>Data Entry</option>
                            </optgroup>
                            <optgroup label="Support Staff">
                                <option value={9}>House Keeping</option>
                                <option value={10}>Office Assisstant</option>
                            </optgroup>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >  
                                        
                    <TextField 
                            fullWidth
                            id="divsion" 
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
                            required
                            id="deskPhone"
                            label="Desk Phone"
                            variant="outlined"
                            value={addEmployee.deskPhone} 
                            onChange={(e) => (setAddEmployee({ ...addEmployee, deskPhone : e.target.value}))}
                            />
                     </Grid>

                     <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="workMobile"
                            label="Work Mobile"
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
                            required
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
                    
                            type="file" 
                            multiple={false} 
                            onDone={({ base64 }) => setAddEmployee({ ...addEmployee, selectedFile: base64 })} 
                        />
                    
              
                    </Grid>

                </Grid>
               
            </Grid>   
		</Paper>
       

        <TextField
    id="standard-name"
    label="Name"
    value="hello"
    InputProps={{endAdornment: <Button />}}
  />

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
              onClick={(e) => (setAddEmployee({ ...addEmployee, addEmployee : e.target.reset}))}
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
    </div>
    
    );
};
