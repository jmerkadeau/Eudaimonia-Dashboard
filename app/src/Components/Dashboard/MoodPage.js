import React from 'react';
import WebByMoodGraph from './../Mood/WebByMoodGraph.js';
import MoodsList from './../Mood/MoodsList.js';
import TopMoodsPie from './../Mood/TopMoodsPie.js';
import PositivityScore from './../Mood/PositivityScore.js';

import {
  getWebByMoodToday,
  getGraphableWebByMoodData,
  getMoodFrequencyToday,
  getOrderedMoods,
  getMoodCount,
  getMoodScore
} from '../../Data/WebsiteByMood';
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
class MoodPage extends React.Component {
  constructor(props) {
    super(props);
    // Mood frequencies
    const moodToday = getMoodFrequencyToday(props.moodLog);
    const moodAllTime = props.allTimeMood;
    // Top Moods Ordered (for moodsList buttons)
    const orderedMoodsToday = getOrderedMoods(moodToday);
    const orderedMoodsAllTime = getOrderedMoods(moodAllTime);

    // get webByMoodToday from moodLog and webLog
    var webByMoodToday = getWebByMoodToday(props.moodLog, props.webLog);
    // console.log(webByMoodToday);
    // turn webByMoods into graphable form (objects in ordered list rather than dict)
    var webByMoodTodayGraphable = getGraphableWebByMoodData(webByMoodToday, 10);
    var webByMoodAllTimeGraphable = getGraphableWebByMoodData(props.allTimeWebByMood, 10);
    // console.log(webByMoodTodayGraphable);
    var moodCountToday = getMoodCount(moodToday);
    var moodCountAllTime = getMoodCount(moodAllTime);

    // console.log(getMoodCount(moodAllTime));

    var moodScoreToday = getMoodScore(moodToday);
    var moodScoreAllTime = getMoodScore(moodAllTime);

    // console.log(props.moodLog);
    // console.log(orderedMoodsToday[0]);
    // console.log(moodCountToday);

    this.state = {
      currentMood: orderedMoodsToday[0],
      allTime: false,
      // orderedMoods (today, allTime, current one to use)
      orderedMoodsToday: orderedMoodsToday,
      orderedMoodsAllTime: orderedMoodsAllTime,
      orderedMoods: orderedMoodsToday,
      // moodData (today, allTime, current one to use)
      moodData: moodToday,
      moodToday: moodToday,
      moodAllTime: moodAllTime,
      // Graphable data (today, allTime, current one to use)
      // Note: initial graph is of top mood in data from today
      todayWebByMoodGraphable: webByMoodTodayGraphable,
      allTimeWebByMoodGraphable: webByMoodAllTimeGraphable,
      graphData: webByMoodTodayGraphable[orderedMoodsToday[0]],
      // Text
      buttonText: "View All Time",
      headerText: "Today",
      // Mood Count:
      moodCount: moodCountToday,
      todayMoodCount: moodCountToday,
      allTimeMoodCount: moodCountAllTime,
      // Mood Score
      moodScore: moodScoreToday,
      moodScoreToday: moodScoreToday,
      moodScoreAllTime: moodScoreAllTime
    };
    // Bind functions to this object so can use this object's state
    this.onCurrentMoodChange = this.onCurrentMoodChange.bind(this);
    this.switchTime = this.switchTime.bind(this);

  }
  comparePositivity() {
    if (this.state.allTime) {
      const allTimeScore = this.state.moodScoreAllTime;
      if (allTimeScore < 20) {
        return "Check out our page for mental health resources";
      } else if (allTimeScore < 40) {
        return "Overall, feeling alright";
      } else if (allTimeScore < 60) {
        return "Overall, feeling good!";
      } else if (allTimeScore < 80) {
        return "Overall, feeling great!";
      } else if (allTimeScore < 101) {
        return "You're on top of the world!";
      }

      // return `Top mood ${this.state.headerText.toLowerCase()}: ${this.state.orderedMoods[0]}`
    } else {
      if (this.state.moodScoreToday < this.state.moodScoreAllTime) {
        // if lower than average
        return `${this.state.moodScoreAllTime - this.state.moodScoreToday}% lower than average`
      } else {
        // if higher than average
        return `${this.state.moodScoreToday - this.state.moodScoreAllTime}% higher than average`

      }
    }
  }

  // Switch Between All-time Data vs Today Data
  // Note when switching, currentMood gets reset to top mood for time period
  switchTime() {
    if (this.state.allTime === false) {
      // set to All Time
      this.setState({
        graphData: this.state.allTimeWebByMoodGraphable[this.state.orderedMoodsAllTime[0]],
        currentMood: this.state.orderedMoodsAllTime[0],
        moodData: this.state.moodAllTime,
        orderedMoods: this.state.orderedMoodsAllTime,
        allTime: true,
        buttonText: "View Today",
        headerText: "All-Time",
        moodCount: this.state.allTimeMoodCount,
        moodScore: this.state.moodScoreAllTime

      });
    } else {
      // set to Today
      this.setState({
        graphData: this.state.todayWebByMoodGraphable[this.state.orderedMoodsToday[0]],
        currentMood: this.state.orderedMoodsToday[0],
        moodData: this.state.moodToday,
        orderedMoods: this.state.orderedMoodsToday,
        allTime: false,
        buttonText: "View All Time",
        headerText: "Today",
        moodCount: this.state.todayMoodCount,
        moodScore: this.state.moodScoreToday


      });
    }
  }

  // switch current mood and data to display in graph
  onCurrentMoodChange(newMood) {
    if (this.state.allTime === false) {
      this.setState({ currentMood: newMood, graphData: this.state.todayWebByMoodGraphable[newMood] });
    } else {
      this.setState({ currentMood: newMood, graphData: this.state.allTimeWebByMoodGraphable[newMood] });
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
            <Grid container className={classes.moodGrid}>
              <Grid item xs={12} sm={6} className={classes.card}>
                {/* <Paper className={classes.altpaper}>
                  <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
                    Moods Logged {this.state.headerText}
                  </Typography>
                  <Typography color={'primary'} variant='h1' className={classes.pieTitle}>
                    {this.state.moodCount}
                  </Typography>
                </Paper> */}
                <Paper className={classes.altpaper}>
                  <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
                    Positivity Score {this.state.headerText}
                  </Typography>
                  {/* <Typography color={'primary'} variant='h1' className={classes.pieTitle}>
                    {this.state.moodCount}
                  </Typography> */}
                  <PositivityScore classNames={classes.centerIt} moodScore={this.state.moodScore}></PositivityScore>
                  <div className={classes.paperDiv}>
                    <Divider className={classes.divider} />
                    <div className={classes.infoDiv}>
                      <Typography color={'inherit'} variant='h6' >
                        {this.comparePositivity()}
                      </Typography>
                      {/* <Typography color={'inherit'} variant='h6' >
                        Top Mood {this.state.headerText}: {this.state.orderedMoods[0]}
                      </Typography> */}

                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.card}>
                <div>
                  <Paper className={classes.altpaper}>
                    <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
                      Moods Distribution
                        </Typography>
                    <TopMoodsPie orderedMoods={this.state.orderedMoods} moodFrequency={this.state.moodData}></TopMoodsPie>
                    <div className={classes.paperDiv}>
                      <Divider className={classes.divider} />
                      <div className={classes.infoDiv}>
                        <Typography color={'inherit'} variant='h6' >
                          {this.state.moodCount} moods logged {this.state.headerText.toLowerCase()}
                        </Typography>

                      </div>
                    </div>
                  </Paper>
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paper} display='inline'>
                  <div className={classes.flex}>
                    <Grid item xs={3}>
                      <MoodsList setCurrentMood={this.onCurrentMoodChange} orderedMoods={this.state.orderedMoods}
                        moodFrequency={this.state.moodData}></MoodsList>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={'primary'} variant='h5' className={classes.graphTitle}>
                        Mood: {this.state.currentMood}
                      </Typography>
                      <WebByMoodGraph currentMood={this.state.currentMood} graphData={this.state.graphData} />
                    </Grid>
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
export default withStyles(styles, { withTheme: true })(MoodPage);
