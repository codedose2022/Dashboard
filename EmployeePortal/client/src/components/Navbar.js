import React,{ useState,useEffect,useRef} from 'react'
import { AppBar,Toolbar,Typography,IconButton,Hidden,Badge,MenuItem,
  Popper,MenuList, Divider,  } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import useStyles from './NavbarStyles.js';
import Mersatlogo from '../images/Mersatlogo.jpg';
import {useHistory} from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';


export default function Navbar() {
  
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
   
  };
  const handleCloseForProfile = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    history.push('/profile');
  };


  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <AppBar position="static" style={{ background: '#388e3c' }} className = {classes.appbar}>
        <Toolbar>
          <img src={Mersatlogo} className={classes.logo} alt = "Mersat logo" />
          <div className={classes.root} />
          
          <div>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              ref={anchorRef}
              aria-label="account of current user"
              aria-controls='menu_id'
              aria-haspopup="true"
              onClick={handleToggle}
              color="inherit"
            >
            
          <Hidden smDown>
            
          <Typography>  user &nbsp; </Typography>
        </Hidden>
              <AccountCircle />
            </IconButton>  
          </div>
         
        
        </Toolbar>
      </AppBar>
      <Popper open={open} anchorEl={anchorRef.current} transition >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper elevation={10} >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                
                    <MenuItem onClick={handleCloseForProfile}>My Profile</MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleClose}>Change password</MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
      </Popper>
            
    </div>
  );
}
