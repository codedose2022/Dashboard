import {
  AppBar,
  Box,
  createMuiTheme,
  Tab,
  Tabs,
  ThemeProvider
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Dashboard/Navbar";
import ListEmployees from "../Employees/Display/ListEmployees";
import EventsPage from "../Events/EventsPage";
import Gallery from "../Gallery/Gallery";
import Polls from "../Polls/Polls";
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
    secondary: {
      main: "#d50000",
    },
  },
});

export default function TabsComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [value, setValue] = useState(_.get(state, "tabs.selectedTab", 0));
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch({ type: "TABS_CHANGE", payload: newValue });
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <AppBar
          position="fixed"
          color="default"
          style={{ backgroundColor: "#ffffff", top: "50px" }}
          elevation={0}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant={smallScreen ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            aria-label="scrollable tabs"
          >
            <Tab
              className={classes.itemSize}
              label="EVENTS"
              {...a11yProps(0)}
            />
            <Tab className={classes.itemSize} label="POLLS" {...a11yProps(1)} />
            <Tab
              className={classes.itemSize}
              label="GALLERY"
              {...a11yProps(2)}
            />
            {props.isEventsMember && (
              <Tab
                className={classes.itemSize}
                label="EMPLOYEES"
                {...a11yProps(3)}
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
          <Gallery />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ListEmployees />
        </TabPanel>
      </ThemeProvider>
    </div>
  );
}
