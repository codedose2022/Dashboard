import React,{ useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createMuiTheme,ThemeProvider} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { green} from '@material-ui/core/colors';
import ListEmployees from './ListEmployees';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
         {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  
  },
  itemSize :{
    fontSize: '0.7rem',
    fontWeight : 'bold'
  }
}));

const theme = createMuiTheme({ 
  palette: {
    primary:{
      main: green[900], 
    },
  },
})




export default function TabsComponent() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };
  

  return (
    <div className={classes.root}>
       <ThemeProvider theme ={theme}>
      <AppBar position="static"  color="default" style = {{ backgroundColor: '#ffffff'}} elevation={0} > 
        <Tabs
          
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab className={classes.itemSize} label="EVENTS" {...a11yProps(0)} />
          <Tab className={classes.itemSize} label="POLLS" {...a11yProps(1)} />
          <Tab className={classes.itemSize} label="GALLERY" {...a11yProps(2)} />
          <Tab className={classes.itemSize} label="EMPLOYEES" {...a11yProps(3)} />
          <Tab className={classes.itemSize} label="POSTS" {...a11yProps(4)} />
          <Tab className={classes.itemSize} label="MESSAGES" {...a11yProps(5)} />
        
        </Tabs>
      </AppBar>
      <TabPanel  value={value} index={0}>
        Item One1
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ListEmployees/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
     
      </ThemeProvider>
    </div>
  );
}
