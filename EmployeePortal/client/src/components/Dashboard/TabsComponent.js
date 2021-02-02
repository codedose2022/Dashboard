import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  createMuiTheme,
  ThemeProvider,
  Box,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ListEmployees from "../Employees/ListEmployees";
import EventsPage from "../Events/EventsPage";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Navbar from '../../components/Dashboard/Navbar';
import { useDispatch, useSelector } from "react-redux";
import Polls from "../Polls/Polls";
import _ from "lodash";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
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
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "60px",
  },
  itemSize: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    color: "rgb(0 0 0)",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
    },
  },
});

export default function TabsComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [value, setValue] = useState(_.get(state, 'tabs.selectedTab',0))
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch ({type: 'TABS_CHANGE', payload: newValue});
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar
          position='fixed'
          color='default'
          style={{ backgroundColor: "#ffffff" }}
          elevation={0}
        >
          <Navbar/>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant={smallScreen ? "scrollable" : "fullWidth"}
            scrollButtons='auto'
            aria-label='scrollable tabs'
          >
            <Tab
              className={classes.itemSize}
              label='EVENTS'
              {...a11yProps(0)}
            />
            <Tab className={classes.itemSize} label='POLLS' {...a11yProps(1)} />
            <Tab
              className={classes.itemSize}
              label='GALLERY'
              {...a11yProps(2)}
            />
            {props.isEventsMember && (
              <Tab
                className={classes.itemSize}
                label='EMPLOYEES'
                {...a11yProps(3)}
              />
            )}
            {props.isEventsMember && (
              <Tab
                className={classes.itemSize}
                label='POSTS'
                {...a11yProps(4)}
              />
            )}
            {props.isEventsMember && (
              <Tab
                className={classes.itemSize}
                label='MESSAGES'
                {...a11yProps(5)}
              />
            )}
          </Tabs>
      
        </AppBar>
        <TabPanel value={value} index={0}>
          <EventsPage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Polls />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ListEmployees />
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
