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
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js'
import WebList from '../Web/WebList.js';


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
    width: '90%',
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
  },
  pieChartTitle: {
    display: 'flex',
    justifyContent: 'center'
  },
  pieChart: {
    display: 'flex',
    justifyContent: 'space-evenly',

  },
  pieChartTypography: {
    marginRight: theme.spacing(-60),
    // marginTop: theme.spacing(10)
    // marginBottom: theme.spacing(4),


  },
  graphTitle: {
    display: 'flex',
    justifyContent: 'center'

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
      headerText: "Today",
      graphTitle: "Web Usage - Today"
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
        headerText: "All-Time",
        graphTitle: "Web Usage - All-Time"

      });
    } else {
      // set to Today
      this.setState({
        graphData: this.state.todayMoodByWeb,
        topSites: this.state.todayTopSites,
        allTime: false,
        buttonText: "View All Time",
        headerText: "Today",
        graphTitle: "Web Usage - Today"

      });
    }
  }

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
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

            <Grid container className={classes.webGrid}>
              <Grid item xs={12}>
                <Paper className={classes.paper} display='inline'>
                  <Typography color={'primary'} variant='h5' className={classes.graphTitle}>
                    {this.state.graphTitle}
                  </Typography>
                  {<div className={classes.flex}>
                    <TopWebGraph allTime={this.state.allTime} topSites={this.state.topSites} setSite={this.setCurrentSite} />
                  </div>}
                </Paper>
              </Grid>
              <Grid item xs={12} className={classes.card}>
                <Paper className={classes.paper} display='inline'>
                  <div >
                    <Box item xs={3} className={classes.pieChartTitle}>
                      {/* <WebList setSite={this.setCurrentSite} topSites={this.state.topSites}
                      webFrequency={this.state.graphData}></WebList> */}

                      <Typography color={'primary'} variant='h5' className={classes.pieChartTypography} >
                        {this.state.currentSite}
                      </Typography>
                    </Box>
                    <Box item xs={3} className={classes.pieChart}>
                      <TopMoodsPieByWeb allTime={this.state.allTime} topSites={this.state.topSites} setSite={this.setCurrentSite} currentSite={this.state.currentSite} moodByWebData={this.state.graphData}></TopMoodsPieByWeb>
                    </Box>
                  </div>
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
