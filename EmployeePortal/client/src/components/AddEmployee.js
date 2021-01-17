import React,{useState} from 'react';
import useStyles from './AddEmployeeStyles';
import FileBase from 'react-file-base64';
import { green,grey} from '@material-ui/core/colors';
import {useDispatch} from 'react-redux';
import { CountryDropdown } from 'react-country-region-selector';
import * as api from '../api';
import Alert from '@material-ui/lab/Alert';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {Paper,IconButton ,FormGroup,Switch,FormHelperText,FormControlLabel,
    Grid,TextField,Divider,createMuiTheme,ThemeProvider,InputLabel,
    FormControl,Typography,MenuItem,Button,Select} from '@material-ui/core'; 
import moment from 'moment';

export default function AddEmployee(props) {

    let token = localStorage.getItem("auth-token");
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
        firstName:props.employee ? props.employee.firstName : '',
        lastName:props.employee ? props.employee.lastName : '',
        email:props.employee ? props.employee.email : '',
        employeeCode:props.employee ? props.employee.employeeCode : '',
        dateOfHire:props.employee ? props.employee.dateOfHire : '',
        deskPhone:props.employee ? props.employee.deskPhone : '',
        workMobile:props.employee ? props.employee.workMobile : '',
        phoneNumber:props.employee ? props.employee.phoneNumber : '',
        dob:props.employee ? props.employee.dob : '',
        hobbies:props.employee ? props.employee.hobbies : '',
        gender:props.employee ? props.employee.gender : '',
        dietPath: props.employee ? props.employee.dietPath : '',
        maritalStatus:props.employee ? props.employee.maritalStatus : '',
        designation:props.employee ? props.employee.designation : '',
        department:props.employee ? props.employee.department : '',
        division:props.employee ? props.employee.division : '',
        nationality:props.employee ? props.employee.nationality : '',
        selectedFile:props.employee ? props.employee.selectedFile : '',
       

    });
    let [dependence, setDependence] = useState(
        props.employee ? props.employee.dependenceDetails : [
        {dependenceName: '',
        dependenceRelationship: '',
        dependenceDob: '',
        },
    ]);
    const handleChangeInput = (index,e) => {
            const values = [...dependence];
            values[index][e.target.name] = e.target.value;
            setDependence(values);
    } 
    const handleAddFields = () => {
        setDependence([...dependence,   {dependenceName: '',
        dependenceRelationship: '',
        dependenceDob: ''}])
    }
    const handleRemoveFields = (index) => {
        const values = [...dependence];
        values.splice(index,1);
        setDependence(values);
    }
    const [errors, setErrors] = useState('');
   
      const validate = (fieldValues = addEmployee) => {
            let temp = {...errors}
            if('firstName' in fieldValues){
            temp.firstName = fieldValues.firstName ? "": "This field is required.";}
            if('lastName' in fieldValues){
            temp.lastName = fieldValues.lastName ? "": "This field is required.";}
            if('email' in fieldValues){
            temp.email = (/.+@.+..+/).test(fieldValues.email) ? "": "Invalid Email.";}
            if('employeeCode' in fieldValues){
            temp.employeeCode = fieldValues.employeeCode ? "": "This field is required.";}
            if('deskPhone' in fieldValues){
            temp.deskPhone = fieldValues.deskPhone.length===4 ? "": "4-digits required.";}
            if('workMobile' in fieldValues){
            temp.workMobile = fieldValues.workMobile.length===10 ? "": "10-digits required.";}
            if('hobbies' in fieldValues){
            temp.hobbies = fieldValues.hobbies ? "": "This field is required.";}
            if('dateOfHire' in fieldValues){
            temp.dateOfHire = fieldValues.dateOfHire ? "": "This field is required.";}
            if('nationality' in fieldValues){
            temp.nationality = fieldValues.nationality ? "": "This field is required.";}
            if('department' in fieldValues){
            temp.department = fieldValues.department ? "": "This field is required.";}
            if('designation' in fieldValues){
            temp.designation = fieldValues.designation ? "": "This field is required.";}
            if('division' in fieldValues){
            temp.division = fieldValues.division ? "": "This field is required.";}
            if('gender' in fieldValues){
            temp.gender = fieldValues.gender ? "": "This field is required.";}
            if('maritalStatus' in fieldValues){
            temp.maritalStatus = fieldValues.maritalStatus ? "": "This field is required.";}
            if('dob' in fieldValues){
            temp.dob = fieldValues.dob ? "": "This field is required.";}
            if('phoneNumber' in fieldValues){
            temp.phoneNumber = fieldValues.phoneNumber.length===10 ? "": "10-digits required.";}
            if('dietPath' in fieldValues){
            temp.dietPath = fieldValues.dietPath ? "": "This field is required.";}
            setErrors({
               ...temp
           })
           console.log("1"+temp);
           return Object.values(temp).every(x=>x === "");
      }
    const [status, setStatus] = useState('');
    const [disableProfile, setDisableProfile] = React.useState({
        disableInd: false,
      });
    
      const handleChange = (event) => {
        setDisableProfile({ ...disableProfile, disableInd: event.target.checked });
      };

    const onChangeFields = (e) => {
            setAddEmployee(
                {
                    ...addEmployee,
                    [e.target.name]:e.target.value
                }
            )
            validate({[e.target.name]:e.target.value});
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
   if(validate()){
    if(!props.employee){
        try{
       addEmployee.dependenceDetails = dependence;
        await api.createEmployee(token,addEmployee).then(
            response => {
                if(response.data.messages.status === '14'){
                setStatus(response.data.messages.message);
                dispatch ({type: 'GET_EMPLOYEES', payload: response.data.employees}); 
            }
                if(response.data.messages.status ==='13')
            {
                setStatus(response.data.messages.message);
            }
               
            }
            
        )
    }catch(error)
    {
        console.log("Error");
    }
    }
    if(props.employee)
    {   
        try{
        addEmployee.dependenceDetails = dependence;    
        addEmployee._id=props.employee._id;
        if(disableProfile.disableInd)
        {
        addEmployee.disableInd="Y";
        }
        const data = await api.editEmployee(token,addEmployee);

        if(data.data.messages.status === '15')
        {
            setStatus(data.data.messages.message);
            dispatch ({type: 'GET_EMPLOYEES', payload: data.data.employees}) 
        }
    }catch(error)
    {
        console.log("Error");
    }
    }
}         
} 
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
            selectedFile:'',
        });
        setErrors('');
      };
    
return(
    <div>
        <form className={classes.form} noValidate autoComplete="off" onSubmit = {handleSubmit}>
        <Paper className={classes.root}  elevation={10}> 
        {status && <Alert severity="error"> {status} </Alert> } 
        <ThemeProvider theme={theme}>
        <Paper className={classes.paper} elevation={5}>
        <Typography variant="h6" align="center" className={classes.typography} >{props.employee ? "EDIT EMPLOYEE DETAILS" : "ADD EMPLOYEE"}</Typography>
        {props.employee && <Grid container justify="flex-end">
        <FormGroup row>
        <FormControlLabel
          value="disableProfile"
          control={<Switch
            checked={disableProfile.disableInd}
            onChange={handleChange}
            color="primary"
            name="disableInd"
            inputProps={{ 'aria-label': 'primary checkbox' }}
            />}
          label="Disable"
          labelPlacement="start"
        />
        </FormGroup>
        </Grid> }
      
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
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            error={errors.firstName?true:false}
                            helperText={errors.firstName}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.firstName : addEmployee.firstName } 
                            onChange={(e) => onChangeFields(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                        <TextField
                            fullWidth
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            error={errors.lastName?true:false}
                            helperText={errors.lastName}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.lastName : addEmployee.lastName} 
                            onChange={(e) => onChangeFields(e)}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            error={errors.email?true:false}
                            helperText={errors.email}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.email : addEmployee.email} 
                            onChange={(e) => onChangeFields(e)}
                        />
                    </Grid>  
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="employeeCode"
                            name="employeeCode"
                            label="Employee Code"
                            variant="outlined"
                            error={errors.employeeCode?true:false}
                            helperText={errors.employeeCode}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.employeeCode : addEmployee.employeeCode} 
                            onChange={(e) => onChangeFields(e)}
                        />                    
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>                    
                         <CountryDropdown  
                         required
                         disabled={disableProfile.disableInd}
                         value={props.employee ? props.employee.nationality : addEmployee.nationality} 
                         onChange={(e) => setAddEmployee({ ...addEmployee, nationality : e})}
                         className={classes.country} />                       
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" >Work Details</Typography>
                        <Divider />
				    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <FormControl  variant="outlined" fullWidth className={classes.formControl} error={errors.department?true:false}>
                            <InputLabel  required id="department">Department</InputLabel>
                            <Select 
                            fullWidth
                            disabled={disableProfile.disableInd}
                            label="department"
                            id="department"
                            name="department"
                            defaultValue={props.employee ? props.employee.department : addEmployee.department}
                            onChange={(e) => onChangeFields(e)}
                            >
                                <MenuItem value="">Select</MenuItem>
                            {departments.map((department) => (
                                <MenuItem
                                value={department.departmentName}
                                key={department.department}
                                >
                                {department.departmentName}
                                </MenuItem>
                            ))}
                            </Select>
                            <FormHelperText>{errors.department}</FormHelperText>
                        </FormControl>
                        </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >  
                        <FormControl  variant="outlined" fullWidth className={classes.formControl} error={errors.designation?true:false}>
                            <InputLabel required id="designation">Designation</InputLabel>
                            <Select 
                            fullWidth
                            displayEmpty
                            label="designation"
                            id="designation"
                            name="designation"
                            defaultValue={props.employee ? props.employee.designation : addEmployee.designation}
                            onChange={(e) => onChangeFields(e)}
                            disabled={!addEmployee.department || disableProfile.disableInd}
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
                            <FormHelperText>{errors.designation}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >                                        
                    <TextField 
                            fullWidth
                            id="division" 
                            required
                            name="division"
                            label="Division" 
                            error={errors.division?true:false}
                            helperText={errors.division}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.division : addEmployee.division} 
                            onChange={(e) => onChangeFields(e)}
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
                            name="dateOfHire"
                            label="Date of Hire"
                            error={errors.dateOfHire?true:false}
                            helperText={errors.dateOfHire}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? moment(props.employee.dateOfHire).format('YYYY-MM-DD') : addEmployee.dateOfHire} 
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => onChangeFields(e)}
                            />
                     </Grid>               
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            id="deskPhone"
                            name="deskPhone"
                            label="Desk Phone"
                            type="number"
                            variant="outlined"
                            error={errors.deskPhone?true:false}
                            helperText={errors.deskPhone}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.deskPhone : addEmployee.deskPhone} 
                            onChange={(e) => onChangeFields(e)}
                            />
                     </Grid>
                     <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            id="workMobile"
                            name="workMobile"
                            label="Work Mobile"
                            type="number"
                            variant="outlined"
                            error={errors.workMobile?true:false}
                            helperText={errors.workMobile}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.workMobile : addEmployee.workMobile} 
                            onChange={(e) => onChangeFields(e)}
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
                            name="gender"  
                            label="Gender" 
                            disabled={disableProfile.disableInd}
                            error={errors.gender?true:false}
                            helperText={errors.gender}
                            defaultValue={props.employee ? props.employee.gender : addEmployee.gender} 
                            onChange={(e) => onChangeFields(e)}
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
                            name="maritalStatus" 
                            disabled={disableProfile.disableInd}
                            label="Marital Status" 
                            error={errors.maritalStatus?true:false}
                            helperText={errors.maritalStatus}
                            defaultValue={props.employee ? props.employee.maritalStatus : addEmployee.maritalStatus} 
                            onChange={(e) => onChangeFields(e)}
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
                            name="phoneNumber"
                            label="Personal Mobile Number"
                            variant="outlined"
                            type="number"
                            error={errors.phoneNumber?true:false}
                            helperText={errors.phoneNumber}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.phoneNumber : addEmployee.phoneNumber} 
                            onChange={(e) => onChangeFields(e)}
                            />
                     </Grid>
                     <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            required
                            id="dob"
                            name="dob"
                            type="date"
                            label="Date of Birth"
                            variant="outlined"
                            error={errors.dob?true:false}
                            helperText={errors.dob}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? moment(props.employee.dob).format('YYYY-MM-DD') : addEmployee.dob} 
                            InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => onChangeFields(e)}
                            />
                     </Grid>
                     <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField
                            fullWidth
                            id="hobbies"
                            name="hobbies"
                            label="Hobbies"
                            variant="outlined"
                            error={errors.hobbies?true:false}
                            helperText={errors.hobbies}
                            disabled={disableProfile.disableInd}
                            defaultValue={props.employee ? props.employee.hobbies : addEmployee.hobbies} 
                            onChange={(e) => onChangeFields(e)}
                            />
                     </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField 
                            fullWidth 
                            required
                            id="dietPath" 
                            name="dietPath" 
                            label="Diet Path" 
                            disabled={disableProfile.disableInd}
                            error={errors.dietPath?true:false}
                            helperText={errors.dietPath}
                            defaultValue={props.employee ? props.employee.dietPath : addEmployee.dietPath } 
                            onChange={(e) => onChangeFields(e)}
                            variant="outlined" select>
                            <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                            <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" >Dependence Details</Typography>
                        <Divider />
				    </Grid>
                    
                    { dependence.map((inputField,index) => (
                    <div  key={index}>
                   
                    <TextField
                    className={classes.div}
                            id="dependenceName"
                            name="dependenceName"
                            label="Name"
                            variant="outlined"
                            disabled={disableProfile.disableInd}
                            value={ inputField.dependenceName} 
                            onChange={(e) => handleChangeInput(index,e)}
                            />
                            <TextField
                            className={classes.div}
                            id="dependenceRelationship"
                            name="dependenceRelationship"
                            label="Relationship"
                            variant="outlined"
                            disabled={disableProfile.disableInd}
                            value={ inputField.dependenceRelationship} 
                            onChange={(e) => handleChangeInput(index,e)}
                            />
                            <TextField
                            className={classes.div}
                            id="dependenceDob"
                            name="dependenceDob"
                            label="Date of Birth"
                            variant="outlined"
                            disabled={disableProfile.disableInd}
                            value={inputField.dependenceDob} 
                            onChange={(e) => handleChangeInput(index,e)}/>
                        <IconButton
                            disabled={index===0}
                           onClick={() => handleRemoveFields(index)}> 
                            <RemoveIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleAddFields()}>
                            <AddIcon />
                        </IconButton>
                     </div>
                    )) }    
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" >Add Profile Photo</Typography>
                        <Divider />
				    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}> 
                        <FileBase  
                            className={classes.fileInput}
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
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} > 
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3} >       
            {!props.employee      &&      
            <Button className ={classes.buttonStyle}
                variant={'contained'} 
                fullWidth 
                disableElevation
                color={'secondary'}
                onClick={clear}
            >
            Reset
            </Button> } 
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3} >                        
            <Button className ={classes.buttonStyle}
                variant={'contained'} 
                fullWidth 
                disableElevation
                color={'primary'}
                type="submit"
            >
            {props.employee ? "UPDATE" : "ADD"}
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
