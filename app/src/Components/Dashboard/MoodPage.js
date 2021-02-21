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
        width: 850,
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        elevation: 3,
      },
      altpaper: {
          margin: theme.spacing(2),
          textAlign: 'center',
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
          elevation: 3,
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
      }
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
                  {/* <Typography color={'primary'} variant='h2'>
                      Mood Page
                  </Typography> */}
                  <Grid container spacing={3}>
                      <Paper className={classes.altpaper}>
                        <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
                          Moods Logged Today:
                        </Typography>
                        <TopMoodsPie orderedMoods={this.state.orderedMoods} 
                        moodFrequency={this.state.moodFrequency}></TopMoodsPie>
                      </Paper>
                      <Paper className={classes.altpaper}>
                        <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
                          Moods Logged All-Time:
                        </Typography>
                        <TopMoodsPie orderedMoods={this.state.orderedMoods} 
                        moodFrequency={this.state.moodFrequency}></TopMoodsPie>
                      </Paper>
                  </Grid>
                  <Grid container spacing={3} className={classes.centerIt}>
                    <Grid item xs={12} md={8} lg={9}>
                      <Paper className={classes.paper} display='inline'>
                        <div className={classes.flex}>
                          <Grid>
                          <MoodsList setCurrentMood={this.onCurrentMoodChange} 
                          orderedMoods={this.state.orderedMoods} 
                          moodFrequency={this.state.moodFrequency}></MoodsList>
                          </Grid>
                          <Grid className={classes.grid1}>
                          <Typography color={'primary'} variant='h5' className={classes.graphTitle}>
                            Mood: {this.state.currentMood}
                          </Typography>
                          <WebByMoodGraph currentMood={this.state.currentMood} 
                          moodData={this.state.moodData} />
                          </Grid>
                          {/* <MoodsList setCurrentMood={this.onCurrentMoodChange} 
                          orderedMoods={this.state.orderedMoods} 
                          moodFrequency={this.state.moodFrequency}></MoodsList>
                          <Typography color={'primary'} variant='h5' className={classes.graphTitle}>
                            Mood: {this.state.currentMood}
                          </Typography>
                          <WebByMoodGraph currentMood={this.state.currentMood} 
                          moodData={this.state.moodData} /> */}
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
              </Container>
              <div className={classes.bottom}>
                <Copyright />
              </div>

            </div>
          </ThemeProvider>
          
      )
    
  }
}
export default withStyles(styles, {withTheme: true })(MoodPage);
