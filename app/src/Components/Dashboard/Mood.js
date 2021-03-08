import React, { useState, useEffect } from 'react';
import {
  Typography, Link, createMuiTheme, ThemeProvider, Container,
  Grid, Paper, Box,
} from '@material-ui/core';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import TopMoodsPie from './../Mood/TopMoodsPie.js';
import WebByMoodGraph from './../Mood/WebByMoodGraph.js';
import { getDataForMood, getTopMoodsToday } from '../../Data/WebsiteByMood';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#347aeb",
      light: "#3d7feb",
    }
  }
});

const styles = theme => ({
  root: {
    marginTop: theme.spacing(20),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  main: {
    padding: theme.spacing(10)
  }
});

//export default function Mood() {
class Mood extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.moodLog);
    //const [orderedMoods, moodFrequency] = getTopMoodsToday(props.moodLog);
    //const moodData = getDataForMood(orderedMoods[0], props.moodLog, props.webLog);
    this.state = {
      //currentMood: orderedMoods[0],
      moodLog: props.moodLog,
      webLog: props.webLog,
      //orderedMoods: orderedMoods,
      //moodFrequency: moodFrequency,
      //moodData: moodData
    };
    this.onCurrentMoodChange = this.onCurrentMoodChange.bind(this);
  }

  onCurrentMoodChange(newMood) {
    // console.log(`onCurrentMoodChange Run ${newMood}`);
    const moodData = getDataForMood(newMood, this.state.moodLog, this.state.webLog);
    this.setState({ currentMood: newMood, moodData: moodData });
    // console.log(`state ${this.state.currentMood}`);
  }

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Container className={classes.main}>
            <Typography variant='h2'>
              Mood Page
                    </Typography>
            <Grid container spacing={3}>
              {/* pie chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <WebByMoodGraph currentMood={this.state.currentMood} moodData={this.state.moodData} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </div>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Mood);
