import React ,{useContext} from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
  MenuItem,
  Menu,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useStyles from "./NavbarStyles.js";
import Mersatlogo from "../../images/Mersatlogo.jpg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../actions/employees";
import _ from "lodash";
import UserContext from "../../context/UserContext";

export default function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { setEmployeeData } = useContext(UserContext);

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
  localStorage.setItem("master_class", '');
  setEmployeeData({
    token : '',
    employee : ''
  })
  history.push('/login');
}


const handleCloseForChangePassword = () =>{
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

          <div style = {{alignSelf : 'flex-start'}}>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls='menu_id'
              aria-haspopup='true'
              onClick={handleClick}
              color='inherit'
            >
              <AccountCircle /> &nbsp;
                <Typography className={classes.fontSizeStyle}>
                  {" "}
                  {employeeName}{" "}
                </Typography>
            
             
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
