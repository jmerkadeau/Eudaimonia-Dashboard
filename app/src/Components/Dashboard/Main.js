import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
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
import ListRouter from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Mood from './Mood.js';
import Dashboard from './Dashboard.js';
import Web from './Web.js';
import Policy from './Policy.js';
import MoodPage from './MoodPage.js';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect} from "react-router-dom";
import SideDrawer from './SideDrawer.js';


import getMoodLog from '../../Data/MoodData.js';
import getWebLog from '../../Data/WebData.js';


const drawerWidth = 240;


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#347aeb",
      light: "#3d7feb"
    }
  }
});

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
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moodLog: [], webLog: [], isLoading: true };
  }

  async componentDidMount() {
    const moodLog = await getMoodLog();
    const webLog = await getWebLog();
    // console.log(moodLog);
    this.setState({
      moodLog: moodLog,
      webLog: webLog,
      isLoading: false
    });
  }

  // createHistory = () => {
  //   const { history } = useHistory();
  // }

  render() {

    const { classes } = this.props;
    return (
      this.state.isLoading ?
        <div></div>
        :
        <div className='home'>
          <ThemeProvider theme={theme}>
            <div className={classes.root}>
              <CssBaseline />
              {/* <Router history={history}> */}
              <Router>
                  <SideDrawer />
                  <Switch>
                      <Route path='/' exact component={() => <Dashboard />} />
                      <Route path='/dashboard' exact component={() => <Dashboard />} />
                      <Route path='/dashboard/mood' exact component={() => <MoodPage webLog={this.state.webLog} moodLog={this.state.moodLog}/>} />
                      <Route path='/dashboard/web' exact component={() => <Web />} />
                      <Route path='/dashboard/privacy' exact component={() => <Policy />} />
                  </Switch>
              </Router>

              </div>
          </ThemeProvider>
        </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main);