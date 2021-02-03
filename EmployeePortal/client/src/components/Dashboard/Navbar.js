import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import useStyles from "./NavbarStyles.js";
import Mersatlogo from "../../images/Mersatlogo.jpg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../actions/employees";
import _ from "lodash";

export default function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const state = useSelector((state) => state);
  const employeeName = _.get(
    state,
    "employees.employee.userData.firstName",
    ""
  );

  let token = localStorage.getItem("auth-token");

  const handleCloseForProfile = (event) => {
    dispatch(getProfile(token));
    history.push("/profile");
  };

const handleCloseForLogOut = () =>{
  localStorage.setItem("auth-token",'');
  dispatch ({type: 'RESET_STORE'});
  history.push('/login');
}


const handleCloseForChangePassword = () =>{
 // localStorage.setItem("auth-token",'');
  //dispatch ({type: 'RESET_STORE'});
  history.push('/changePassword');
}

  return (
    <div>
      <AppBar
        position='relative'
        style={{ background: "#388e3c" }}
        className={classes.appbar}
      >
        <Toolbar>
          <img src={Mersatlogo} className={classes.logo} alt='Mersat logo' />
          <div className={classes.root} />

          <div>
            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls='menu_id'
              aria-haspopup='true'
              onClick={handleClick}
              color='inherit'
            >
              <Hidden smDown>
                <Typography className={classes.fontSizeStyle}>
                  {" "}
                  Welcome {employeeName}{" "}
                </Typography>
              </Hidden>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          variant = 'selectedMenu'
          style = {{ top: '35px', marginLeft: '5px'}}
          
        >
          <MenuItem
         
            style={{ fontSize: "0.95rem" }}
            onClick={handleCloseForProfile}
          >
            My Profile
          </MenuItem>
         
          <MenuItem style={{ fontSize: "0.95rem" }} onClick={handleCloseForChangePassword}>
            Change password
          </MenuItem>
          
          <MenuItem style={{ fontSize: "0.95rem" }} onClick={handleCloseForLogOut}>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </div>
  );
}
