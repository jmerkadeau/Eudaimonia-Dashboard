import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { auth } from './../../Data/Firebase.js'

import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { Link as ReactLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { MenuList, MenuItem, ListItemIcon, ListItemText, Popover } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import ListRouter from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Mood from './Mood.js';
import Dashboard from './Dashboard.js';
import Web from './WebPage.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideDrawer from './SideDrawer.js';
import ComputerIcon from '@material-ui/icons/Computer';
import MoodIcon from '@material-ui/icons/Mood';
import TodayIcon from '@material-ui/icons/Today';
import PolicyIcon from '@material-ui/icons/Policy';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SignOut from './../LandingPage/SignOut.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
import { propTypes } from 'react-bootstrap/esm/Image';
import ChangeUsername from './ChangeUsername.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Project Eudaimonia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#fff',

  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#fff'

  },
  menuButton: {
    marginRight: 36,
    color: 'black'
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    color: 'black'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  popoverClass: {
    textAlign: 'center',
    marginTop: theme.spacing(0)

  },
  popoverBox: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4)
  },
  popoverPhoto: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',

    // padding: theme.spacing(2),

  },
  popoverUsername: {
    color: theme.palette.grey.A500,
    marginTop: theme.spacing(2),
    fontWeight: "600",
    fontSize: 23,
    marginBottom: theme.spacing(1)
  },
  popoverName: {
    color: theme.palette.grey.A500,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  popoverEmail: {
    color: theme.palette.grey.A500,
    marginBottom: theme.spacing(3)
  },
  spacer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  changeUsernameButton: {
    marginBottom: theme.spacing(1.5),
    color: theme.palette.common.white,
  },
  signOutButton: {
    color: theme.palette.common.white,
  }
}));

export default function Main(props) {
  const classes = useStyles();
  let urlElements = window.location.href.split('/');
  let currentPage = urlElements[4];
  let check = window.location.pathname;
  // console.log(check);
  const userInfo = auth.currentUser;
  // const username = userInfo.username;
  // console.log(props.username);

  const name = userInfo.displayName;
  const email = userInfo.email;
  // const uid = userInfo.uid;
  const photo = userInfo.photoURL;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [changeUsernameShow, setChangeUsernameShow] = React.useState(false);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? 'simple-popover' : undefined;


  const changeTitle = () => {
    switch (window.location.pathname) {
      case '/dashboard/mood':
        return 'Mood';
      case '/dashboard/web':
        return 'Web';
      case '/dashboard/privacy':
        return 'Privacy';
      case '/privacy':
        return 'Privacy';
      default:
        return 'Mood';
    }
  }

  const [title, setTitle] = React.useState(changeTitle());
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const setMood = () => {
    setTitle('Mood');
  }
  const setWeb = () => {
    setTitle('Web');
  }
  const setFriends = () => {
    setTitle('Friends');
  }
  const setSocial = () => {
    setTitle('Social');
  }
  const setPolicy = () => {
    setTitle('Privacy');
  }
  // this.state = {
  //   headerText: props.headerText,
  // }
  // const Testing = () => {
  //   let urlElements = window.location.href.split('/')
  //   console.log(urlElements[3])
  // }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const changeUsername = () => {
    // console.log('change username pressed');
    setChangeUsernameShow(true);
    // console.log(changeUsernameShow);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <CssBaseline />
        <ChangeUsername show={changeUsernameShow} setShow={setChangeUsernameShow} currentUsername={props.username} setNewUsername={props.setNewUsername}></ChangeUsername>
        {/* <ChangeUsername></ChangeUsername> */}
        <AppBar elevation={1} position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {title}
              {/* {headerText} */}

            </Typography>
            {/* <ReactLink to="/"> */}
            {/* <Button variant='contained' color='primary' onClick={SignOut}>
                          Sign Out
                      </Button> */}
            {/* </ReactLink> */}
            {/* <IconButton color="black">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton aria-describedby={popoverId} onClick={handleClick}>
              <Avatar alt='profile' src={photo} />
              {/* <img src={photo} id='profilePic' alt='Profile' /> */}
            </IconButton>
            <Popover
              id={popoverId}
              className={classes.popoverClass}
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box className={classes.popoverBox}>
                <Avatar alt='profile' src={photo} className={classes.popoverPhoto} />
                <Typography className={classes.popoverUsername}>{props.username}</Typography>
                {/* <Typography className={classes.popoverName}>{name}</Typography> */}
                <Typography className={classes.popoverEmail}>{email}</Typography>
                <Button variant='contained' color='primary' onClick={changeUsername} className={classes.changeUsernameButton}>
                  Change Username
                </Button>
                <br className={classes.spacer} />
                <SignOut className={classes.signOutButton} />
              </Box>
            </Popover>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuList>
            {/* <MenuItem component={ReactLink} to="/dashboard" icon={TodayIcon} id='Summary' onClick={setSummary}>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary='Summary' />
            </MenuItem> */}
            <MenuItem component={ReactLink} to="/dashboard/mood" icon={MoodIcon} id='Mood' onClick={setMood}>
              <ListItemIcon>
                <MoodIcon />
              </ListItemIcon>
              <ListItemText primary='Mood' />
            </MenuItem>
            <MenuItem component={ReactLink} to="/dashboard/web" icon={ComputerIcon} id='Web' onClick={setWeb}>
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary='Web' />
            </MenuItem>
            <MenuItem component={ReactLink} to="/dashboard/social" icon={PeopleIcon} id='Social' onClick={setSocial}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Social' />
            </MenuItem>
            <MenuItem component={ReactLink} to="/dashboard/friends" icon={PersonAddIcon} id='Friends' onClick={setFriends}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary='Friends' />
            </MenuItem>
            <MenuItem component={ReactLink} to="/dashboard/privacy" icon={PolicyIcon} id='Policy' onClick={setPolicy}>
              <ListItemIcon>
                <PolicyIcon />
              </ListItemIcon>
              <ListItemText primary='Privacy' />
            </MenuItem>



          </MenuList>
          {/* <List>{mainListItems}</List> */}
          {/* <Divider /> */}
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
      </div>
    </ThemeProvider>

  );
}