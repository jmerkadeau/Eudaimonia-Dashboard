import React from 'react';
import TopMoodsPieByWeb from './../Web/TopMoodsPieByWeb.js';
import TopWebGraph from './../Web/TopWebGraph.js';
import { getWebData, getTimeByDomainToday, getTimeByDomainAllTime } from '../../Data/MoodByWebsite';
import {
  Typography, Link, createMuiTheme, ThemeProvider, Container,
  Grid, Paper, Box, Button, Card, Divider
} from '@material-ui/core';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Project Eudaimonia
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#347aeb",
      light: "#3d7feb",
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  }
});

const styles = theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {
    margin: theme.spacing(5),
    alignItems: 'center',
  },
  paper: {
    // width: 850,
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    display: 'flex',
    // overflow: 'auto',
    flexDirection: 'column',
    // elevation: 3,
  },
  togglePaper: {
    margin: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    elevation: 3,
    alignItems: 'center',
  },
  altpaper: {
    margin: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    elevation: 3,
    alignItems: 'center',
    width: '100%'
  },
  paperDiv: {
    textAlign: 'center',
    overflow: 'auto',
    alignItems: 'center',
    width: '100%'
  },
  infoDiv: {
    textAlign: 'left',
    overflow: 'auto',
    alignItems: 'left',
    width: '100%',
    marginLeft: theme.spacing(8)
  },
  infoText: {

  },
  centerPieCharts: {

  },
  fixedHeight: {
    height: 240,
  },
  pieTitle: {
    margin: theme.spacing(2),
    align: 'center',
  },
  graphTitle: {
    margin: theme.spacing(2),
    align: 'center',
    paddingLeft: theme.spacing(8.5),
  },
  centerIt: {
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  bottom: {
    margin: theme.spacing(3),
  },
  flex: {
    display: 'flex',
  },
  grid1: {
    width: 700,
  },
  moodGrid: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'stretch'
  },
  card: {
    display: 'flex',
    width: '100%'
  },
  divider: {
    background: "primary"
  }
});


// Main page for the data section but all the work is done in other files
class WebPage extends React.Component {
  constructor(props) {
    super(props);
    const todayMoodByWeb = getWebData(props.moodLog, props.webLog);
    const todayTopSites = getTimeByDomainToday(props.webLog);
    const allTimeTopSites = getTimeByDomainAllTime(props.allTimeWeb);
    this.state = {
      // currentSite
      currentSite: todayTopSites[0].name,
      // allTime Toggle
      allTime: false,
      // topSites (today, allTime, which one)
      todayTopSites: todayTopSites,
      allTimeTopSites: allTimeTopSites,
      topSites: todayTopSites,
      // moodByWeb (today, allTime, which one)
      todayMoodByWeb: todayMoodByWeb,
      allTimeMoodByWeb: props.allTimeMoodByWeb,
      graphData: todayMoodByWeb,
      // Texts
      buttonText: "View All Time",
      headerText: "Web Today"
    };
    // Bind functions to this object so can use this object's state
    this.setCurrentSite = this.setCurrentSite.bind(this);
    this.switchTime = this.switchTime.bind(this);

  }

  // Set current site to display in graph
  setCurrentSite(domain) {
    this.setState({ currentSite: domain });
  }


  // Switch Between All-time Data vs Today Data
  switchTime() {
    if (this.state.allTime === false) {
      // set to All Time
      this.setState({
        graphData: this.state.allTimeMoodByWeb,
        topSites: this.state.allTimeTopSites,
        allTime: true,
        buttonText: "View Today",
        headerText: "Web All-Time"
      });
    } else {
      // set to Today
      this.setState({
        graphData: this.state.todayMoodByWeb,
        topSites: this.state.todayTopSites,
        allTime: false,
        buttonText: "View All Time",
        headerText: "Web Today"
      });
    }
  }

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Container className={classes.container}>
            {/* <Typography color={'primary'} variant='h2'>
                      Mood Page
                  </Typography> */}

            <Grid container>
              <Paper className={classes.togglePaper}>
                <Button onClick={this.switchTime}>{this.state.buttonText}</Button>
              </Paper>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paper} display='inline'>
                  {<div className={classes.flex}>
                    <TopWebGraph topSites={this.state.topSites} setSite={this.setCurrentSite} />
                  </div>}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper} display='inline'>
                  {<div className={classes.flex}>
                    <Typography color={'primary'} variant='h4'>
                      {this.state.currentSite}
                    </Typography>
                    <TopMoodsPieByWeb currentSite={this.state.currentSite} moodByWebData={this.state.graphData}></TopMoodsPieByWeb>
                  </div>}
                </Paper>
              </Grid>
            </Grid >



          </Container >
          <div className={classes.bottom}>
            <Copyright />
          </div>

        </div >
      </ThemeProvider >

    )

  }
}
export default withStyles(styles, { withTheme: true })(WebPage);
