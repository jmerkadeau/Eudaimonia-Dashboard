import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
// import { database } from './Data/Firebase.js';
import { database } from '../../Data/Firebase.js';

import { useObject } from 'react-firebase-hooks/database';



import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListRouter from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Mood from './Mood.js';
import Dashboard from './Dashboard.js';
import WebPage from './WebPage.js';
import Policy from './Policy.js';
import MoodPage from './MoodPage.js';
import Friends from "./../Friends/Friends.js";
import Social from "./../Friends/Social.js";

import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import SideDrawer from './SideDrawer.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';

import AlertDialog from './AlertDialog.js';
import UsernameDialog from './UsernameDialog.js';

import FacebookSpinner from './FacebookSpinner.js';

import getMoodLog from '../../Data/MoodData.js';
import getWebLog from '../../Data/WebData.js';
import { getAllTimeWebByMood, getAllTimeMoodByWeb, getAllTimeMood, getAllTimeWeb } from './../../Data/AllTimeData.js';
import logo from "./logo192.png";



const drawerWidth = 240;


const styles = theme => ({
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
    backgroundColor: '#fff'
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
  loadingIcon: {
    width: '6rem',
  },

  loadingSpinner: {
    color: theme.palette.grey.A200,
    thickness: 2
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: props.user, extensionAdded: true, moodLog: [], webLog: [], isLoading: true, allTimeWebByMood: {}, allTimeMoodByWeb: {}, usernameAdded: true, username: "" };
    this.changeUsernameStatus = this.changeUsernameStatus.bind(this);
    this.changeUsername = this.changeUsername.bind(this);

  }

  async componentDidMount() {
    // console.log(this.state.user);
    // console.log("start loading");
    var uid = "";
    if (this.state.user) {
      uid = this.state.user.uid;
    }
    // console.log(uid);
    try {
      // const [snapshots, loading, error] = useObject(database.ref(`users/${uid}`));
      const ref = database.ref(`users/${uid}`);
      ref.on('value', (snapshots) => {
        const val = snapshots.val();
        // console.log(val);
        // Check for extension
        if ("extension" in val && val.extension) {
          // console.log("With extension");
          this.state.extensionAdded = true;
        } else {
          // console.log("no extension");
          this.state.extensionAdded = false;
        }
        // Check for username
        if ("username" in val && val.username !== "") {
          console.log(`With username: ${val.username}`);
          this.state.usernameAdded = true;
          this.state.username = val.username;
        } else {
          console.log("no username");
          this.state.usernameAdded = false;
        }
      });
    } catch (err) {
      console.log(err);
      this.state.extensionAdded = false;
      this.state.usernameAdded = false;
    }


    const moodLog = await getMoodLog();
    const webLog = await getWebLog();
    const allTimeWebByMood = await getAllTimeWebByMood();
    const allTimeMoodByWeb = await getAllTimeMoodByWeb();
    const allTimeMood = await getAllTimeMood();
    const allTimeWeb = await getAllTimeWeb();
    // console.log(allTimeWeb);
    // console.log(allTimeMood);
    this.setState({
      moodLog: moodLog,
      webLog: webLog,
      allTimeWebByMood: allTimeWebByMood,
      allTimeMoodByWeb: allTimeMoodByWeb,
      allTimeMood: allTimeMood,
      allTimeWeb: allTimeWeb,
      isLoading: false
    });
    // console.log("end loading");

  }

  // createHistory = () => {
  //   const { history } = useHistory();
  // }
  changeUsernameStatus(b) {
    // console.log(b);
    this.setState({ usernameAdded: b });
  }
  changeUsername(name) {
    this.setState({ username: name });

  }

  render() {
    const { classes } = this.props;
    const extensionAdded = this.state.extensionAdded;
    let alert;
    if (extensionAdded === false) {
      // no extension
      // show alert
      return (<div>
        <AlertDialog></AlertDialog>
      </div>);
    } else {
      // extension added
      if (!this.state.usernameAdded) {
        console.log("Show choose username alert");
        return (<div>
          <UsernameDialog changeUsernameStatusFunc={this.changeUsernameStatus}></UsernameDialog>
        </div>);
      }
    }
    return (
      this.state.isLoading ?
        (<div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs={3}>
              {/* <CircularProgress color="primary" size='10rem'></CircularProgress> */}
              <Box position="relative" display="inline-flex">
                {/* <CircularProgress thickness='2' size='15rem' class={classes.loadingSpinner}> </CircularProgress> */}
                <FacebookSpinner></FacebookSpinner>
                <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* <Typography
                    variant="caption"
                    component="div"
                    color="textSecondary"
                  >{`10%`}</Typography> */}
                  {/* <Logo></Logo> */}
                  <img alt='logo' src={logo} class={classes.loadingIcon}></img>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </div>)
        :
        (<div className='home'>
          <ThemeProvider theme={theme}>
            <div className={classes.root}>
              <CssBaseline />
              {/* <Router history={history}> */}
              <Router>
                {alert}
                <SideDrawer username={this.state.username} setNewUsername={this.changeUsername} />
                <Switch>
                  {/* <Route path='/' exact component={() => <Dashboard />} />
                  <Route path='/dashboard' exact component={() => <Dashboard />} /> */}
                  <Route path='/' exact component={() => <MoodPage webLog={this.state.webLog} moodLog={this.state.moodLog} allTimeMood={this.state.allTimeMood} allTimeWebByMood={this.state.allTimeWebByMood} />} />
                  <Route path='/dashboard' exact component={() => <MoodPage webLog={this.state.webLog} moodLog={this.state.moodLog} allTimeMood={this.state.allTimeMood} allTimeWebByMood={this.state.allTimeWebByMood} />} />
                  <Route path='/dashboard/mood' exact component={() => <MoodPage webLog={this.state.webLog} moodLog={this.state.moodLog} allTimeMood={this.state.allTimeMood} allTimeWebByMood={this.state.allTimeWebByMood} />} />
                  <Route path='/dashboard/web' exact component={() => <WebPage webLog={this.state.webLog} moodLog={this.state.moodLog} allTimeWeb={this.state.allTimeWeb} allTimeMoodByWeb={this.state.allTimeMoodByWeb} />} />
                  <Route path='/dashboard/friends' exact component={() => <Friends user={this.state.user} />} />
                  <Route path='/dashboard/social' exact component={() => <Social user={this.state.user} webLog={this.state.webLog} />} />
                  <Route path='/privacy' exact component={() => <Policy />} />
                  <Route path='/dashboard/privacy' exact component={() => <Policy />} />
                </Switch>
              </Router>

            </div>
          </ThemeProvider>
        </div>)
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main);