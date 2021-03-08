import React from "react";
import { Grid, Icon, Button, useMediaQuery, Container, Typography, ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core";
import stockTyping from './../../../stockTyping.jpg';
import webByMood from "./../../../img/moodByWeb.png";
import Dashboard from "./../../../img/dashboard.png";

import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './Theme.js';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#58A1C1",
//       light: "#7BB5CE",
//     },
//   }
// });

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    // marginBottom: theme.spacing(10),
    // backgroundColor: theme.palette.grey.A100
  },
  rightText: {
    marginRight: theme.spacing(20),
    marginBottom: theme.spacing(1),
    color: theme.palette.grey.A700
  },
  rightSubHeader: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.dark
  },
  photo: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(15),
    width: '80%'
    // height: '100%'
  },
  title: {
    textAlign: 'center',
    marginRight: theme.spacing(25),
    color: theme.palette.primary.main
  },
  breakLine: {
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
}))

const Services = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <section className={classes.root}>
        <div className="container">
          <Grid container spacing={isMobile ? 4 : 10} justify="space-between">
            <Grid item sm={6} xs={12} >
              <img
                src={Dashboard}
                alt="graduate"
                className={classes.photo}
              // className="max-h-500 max-w-full border-radius-12"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant='h2' className={classes.title}>
                Our Mission
                </Typography><br />
              <Typography variant='h5' className={classes.rightSubHeader}>
                The Problem
                </Typography>
              <Typography className={classes.rightText}>
                Studies have consistently shown that excessive web consumption leads
                to increased feelings of anxiety, isolation, and depression.
                </Typography>
              <Typography className={classes.rightText}>
                However, there is a lack of substantial
                research on how specific sites influence your mental health.
                </Typography>
              <div className={classes.breakLine}>
                <br />

              </div>
              <Typography variant='h5' className={classes.rightSubHeader}>
                Our Solution
                </Typography>
              <Typography className={classes.rightText}>
                With data privacy in mind, we’ve developed a secure cloud platform enabling you to better understand how
                web usage patterns affect your own mood throughout the day.
                </Typography>
              <Typography className={classes.rightText}>
                By sharing our technology and our vision, we empower you to improve
                your own mental health through key insights and the adoption of healthier online habits.
                </Typography>


              {/* <h1 className="mt-0 text-48 font-normal mb-8 inline-block">
                Our Services
              </h1>
              <p className="my-8 max-w-400">
              Project Eudaimonia is our solution. With data privacy in mind,
              we’ve developed a secure cloud platform to help users better
              understand how the internet affects their mental health. We combine
              the functionality of productivity trackers like RescueTime with a
              simple and clean user interface for mood logging.

              </p> */}
            </Grid>
          </Grid>
        </div>
      </section>
    </ThemeProvider>

    // <section className='section'>
    //     <div className='container'>
    //     <Grid container>
    //     <Grid>
    //         <img src={stockTyping} alt="Typing"/>
    //     </Grid>
    //     <Grid>
    // <Typography variant='h2' color='primary'>
    //     Our Services
    // </Typography>
    // <Typography>
    //     Project Eudaimonia is our solution. With data privacy in mind,
    //     we’ve developed a secure cloud platform to help users better
    //     understand how the internet affects their mental health. We combine
    //     the functionality of productivity trackers like RescueTime with a
    //     simple and clean user interface for mood logging.
    // </Typography>
    //     </Grid>
    //     </Grid>
    //     </div>
    // </section>
  )
}

export default Services;