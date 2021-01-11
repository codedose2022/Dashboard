import React from 'react';
import useStyles from './AddEmployeeStyles';
import {Paper,Grid,TextField,Divider,Typography} from '@material-ui/core'; 
export default function MyProfile() {
    const classes = useStyles(); 
return(
    <div>
        <Paper className={classes.paper} elevation={5}>
			<Grid>			
				<Grid container spacing={2}>
                <Grid item xs={12}>
					<Typography variant="h6" >Basic Info</Typography>
					<Divider />
				</Grid>
				</Grid>

                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <TextField
					          fullWidth
                    id="outlined-read-only-input"
                    label="First Name"
                    defaultValue="Alice"
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                 <TextField
				            fullWidth
                    id="outlined-read-only-input"
                    label="Last Name"
                    defaultValue="Wonderland"
                    variant="outlined"
                />
                </Grid>
                </Grid>

                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
				            fullWidth
                    id="outlined-read-only-input"
                    label="Email"
                    defaultValue="demo@gmail.com"
                    variant="outlined"
                />
                </Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
				            fullWidth
                    id="outlined-read-only-input"
                    label="Employee Code"
                    defaultValue="E1234"
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
				            fullWidth
                    id="outlined-read-only-input"
                    label="Employee Code"
                    defaultValue="E1234"
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
				            fullWidth
                    id="outlined-read-only-input"
                    label="Employee Code"
                    defaultValue="E1234"
                    variant="outlined"
                />
                </Grid>
                </Grid>
            </Grid>   
		</Paper>
			
    </div>
    
    );
};
