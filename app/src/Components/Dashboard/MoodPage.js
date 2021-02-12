import React, { useState, useEffect } from 'react';
//import './../Mood/Mood.css';
import WebByMoodGraph from './../Mood/WebByMoodGraph.js';
import MoodsList from './../Mood/MoodsList.js';
import TopMoodsPie from './../Mood/TopMoodsPie.js';
import { getDataForMood, getTopMoodsToday } from './../../Data/WebsiteByMood.js';
import { Typography, Link, createMuiTheme, ThemeProvider, Container, 
    Grid, Paper, Box,  
} from '@material-ui/core';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";


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
        marginTop: theme.spacing(5),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        padding: theme.spacing(5),
      },
      paper: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        elevation: 3,
      },
      altpaper: {
          margin: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
          elevation: 3,
      },
      fixedHeight: {
        height: 240,
      },
});


// Main page for the data section but all the work is done in other files
class MoodPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.moodLog);
    const [orderedMoods, moodFrequency] = getTopMoodsToday(props.moodLog);
    const moodData = getDataForMood(orderedMoods[0], props.moodLog, props.webLog);
    this.state = {
      currentMood: orderedMoods[0],
      moodLog: props.moodLog,
      webLog: props.webLog,
      orderedMoods: orderedMoods,
      moodFrequency: moodFrequency,
      moodData: moodData
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
      return(
          <ThemeProvider theme={theme}>
              <div className={classes.root}>
                  <Container className={classes.container}>
                      <Typography color={'primary'} variant='h2'>
                          Mood Page
                      </Typography>
                      <Grid container spacing={3}>
                          <Paper className={classes.altpaper}>
                            <TopMoodsPie orderedMoods={this.state.orderedMoods} 
                            moodFrequency={this.state.moodFrequency}></TopMoodsPie>
                          </Paper>
                      </Grid>
                      <Grid container spacing={3}>
                          <Grid item xs={12} md={8} lg={9}>
                            <Paper className={classes.paper}>
                                <MoodsList setCurrentMood={this.onCurrentMoodChange} 
                                orderedMoods={this.state.orderedMoods} 
                                moodFrequency={this.state.moodFrequency}></MoodsList>
                                <WebByMoodGraph currentMood={this.state.currentMood} 
                                moodData={this.state.moodData} />
                            </Paper>
                          </Grid>

                          
                      </Grid>
                  </Container>
              </div>
    {/* 
      <div className='mood' >
        <h1>
          Mood
          </h1>
        <div>
          <WebByMoodGraph currentMood={this.state.currentMood} moodData={this.state.moodData} />
        </div>
        <div>
          <MoodsList setCurrentMood={this.onCurrentMoodChange} orderedMoods={this.state.orderedMoods} moodFrequency={this.state.moodFrequency}></MoodsList>
        </div>
        <div>
          <TopMoodsPie orderedMoods={this.state.orderedMoods} moodFrequency={this.state.moodFrequency}></TopMoodsPie>
        </div>
      </div> */}
          </ThemeProvider>
          
      )
    
  }
}
export default withStyles(styles, {withTheme: true })(MoodPage);
