import React from "react";
import { Grid, useMediaQuery, Typography, ThemeProvider, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from '@material-ui/core/CssBaseline';
import projectLogo from './../../img/logos/logo.png';
import theme from './Sections/Theme.js';
import webStore from './img/webstore.png';
import pinToTop from './img/PinToTop.png';
import signIn from './img/signin.png';
import moodLogger from './img/moodLogger.png';
import dashboard from './img/dashboard.png';

import { Link as RouterLink } from 'react-router-dom';







const useStyles = makeStyles((theme) => ({
  root: {

  },

  // Header Style
  header: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(18)
  },
  projectEudaimonia: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey.A500,
    fontWeight: theme.typography.fontWeightBold
  },
  logo: {
    width: 25,
    height: 25,
  },

  // Tutorial Section
  tutorial: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(8),
    alignItems: 'center',
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    // textAlign: "center"

    // backgroundColor: theme.palette.grey.A100
  },
  // install chrome extension button
  buttons: {
    display: 'flex',
    marginBottom: theme.spacing(3)
  },
  webStoreImg: {
    width: '80%',
    paddingLeft: theme.spacing(20)
  },
  loginImg: {
    width: '60%',
    paddingLeft: theme.spacing(20)
  },
  moodLoggerImg: {
    width: '20%',
    paddingLeft: theme.spacing(20)
  },
  sampleDashboard: {
    width: '60%',
    paddingLeft: theme.spacing(20)
  },
  center: {
    textAlign: "center"
  },
  leftSubHeaders: {
    paddingLeft: theme.spacing(10)
  },
  leftPadding: {
    paddingLeft: theme.spacing(20)
  }

}));

const GetStarted = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  console.log(theme.palette.grey.A500);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>

        {/* Header */}
        <RouterLink style={{ textDecoration: 'none' }} to="/">
          <Grid item className={classes.header} xs={12}>

            <img src={projectLogo} alt='Eudaimonia Logo' className={classes.logo} />

            <Typography variant='h5' className={classes.projectEudaimonia}>
              Project
  </Typography>
            <Typography variant='h5' className={classes.projectEudaimonia}>
              Eudaimonia
  </Typography>
          </Grid>
        </RouterLink>
        {/* Tutorial Section */}
        <Grid container justify="space-between" className={classes.tutorial}>
          <Grid item xs={12} className={classes.leftSide}>
            <Typography variant='h2' color='primary' className={classes.center}>
              Getting Started
                </Typography><br />
            <Divider />

            <Typography variant='h5' className={classes.leftSubHeaders}>
              1. Add Chrome Extension
                </Typography>
            <Typography className={classes.leftPadding}>
              Click the button below to head to the Google Web Store.
                </Typography><br />
            {/* Buttons */}
            <a className={classes.leftPadding} style={{ textDecoration: 'none', }} href={'https://chrome.google.com/webstore/detail/eudaimonia/bppoigjdaealcnkilpogfpaffhfjmchj?hl=en'}>
              <Button variant='contained' size='large' className={classes.extensionButton} style={{ textTransform: 'none' }}>
                Install Chrome Extension
                    </Button>
            </a>
            <Typography className={classes.leftPadding}>
              On the page for the Eudaimonia extension, click "Add to Chrome".
                </Typography><br />
            <img src={webStore} alt='Chrome Web Store' className={classes.webStoreImg} />
            <Divider />
            <br />
            <Typography variant='h5' className={classes.leftSubHeaders}>
              2. Pin to Top
                </Typography>
            <Typography className={classes.leftPadding}>
              In your Chrome window, click the Extensions button (puzzle icon). On the popup, click the Pin button next to the Eudaimonia extension. This will allow for easy access to the mood logger.
                </Typography><br />
            <img src={pinToTop} alt='Pin To Top' className={classes.loginImg} />
            <Divider />
            <Typography variant='h5' className={classes.leftSubHeaders}>
              3. Login with your Google Account
                </Typography>
            <Typography className={classes.leftPadding}>
              Sign in with your Google account. Note: you must use the same account to access the dashboard.
                </Typography><br />
            <img src={signIn} alt='Sign in with your Google account' className={classes.loginImg} />
            <Divider />

            <Typography variant='h5' className={classes.leftSubHeaders}>
              4. Log a mood
                </Typography>
            <Typography className={classes.leftPadding}>
              Choose the mood that most accurately reflects how you feel right now. You may open the extension to log more if necessary.
            </Typography><br />
            <img src={moodLogger} alt='Log a mood' className={classes.moodLoggerImg} />
            <Typography className={classes.leftPadding}>
              Note: there will be a red notification bubble on the extension icon when our algorithm determines the optimal time for you to log a mood.
            </Typography><br />
            <Divider />

            <Typography variant='h5' className={classes.leftSubHeaders}>
              5. View Your Data
                </Typography>
            <Typography className={classes.leftPadding}>
              Click the "Dashboard" button from the extension or go to projecteudaimonia.net. Login with the same Google account and view all your web/mood data.
            </Typography><br />
            <img src={dashboard} alt='Dashboard snippet' className={classes.sampleDashboard} />


          </Grid>
        </Grid>
      </div>
    </ThemeProvider >
  )
}

export default GetStarted;