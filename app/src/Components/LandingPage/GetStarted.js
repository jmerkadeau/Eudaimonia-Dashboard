import React from "react";
import { Grid, useMediaQuery, Typography, ThemeProvider, Divider, Button, Link } from "@material-ui/core";
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

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(18),

  },
  link: {
    display: 'flex',
    alignItems: 'center',
    width: '285px',
    color: '#8C8C8C',
    textDecoration: 'none',
    '&:hover': {
      color: '#58A1C1'
    },
  },
  bottomLink: {
    display: 'flex',
    alignItems: 'center',
    width: '285px',
    color: '#8C8C8C',
    textDecoration: 'none',
    '&:hover': {
      color: '#58A1C1'
    },
    

  },
  homeButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2)
    
  },
  projectEudaimonia: {
    marginLeft: theme.spacing(1),
    // color: theme.palette.grey.A500,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'none',
    
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
    [theme.breakpoints.down('md')]: {
      // backgroundColor: theme.palette.primary.dark
      
    },
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.primary.light,
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),

      
    },
    [theme.breakpoints.down('xs')]: {
      // backgroundColor: theme.palette.primary.dark
      
    },
    // textAlign: "center"

    // backgroundColor: theme.palette.grey.A100
  },
  centerTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)

  },
  extensionButton: {
    color: theme.palette.common.white,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: '250px',

    
    
    
  },

  // install chrome extension button
  buttons: {
    display: 'flex',
    marginBottom: theme.spacing(3)
  },
  webStoreImg: {
    width: '80%',
    paddingLeft: theme.spacing(20),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(15)
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
      width: '100%'

    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
    },

  },
  loginImg: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(-4),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(0)
    },
    [theme.breakpoints.only('sm')]: {
      width: '80%',
      marginTop: theme.spacing(2),

    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      width: '100%'

      

    }
  },
  moodLoggerImg: {
    width: '50%',
    marginTop: theme.spacing(-4),
    marginLeft: theme.spacing(20),
    // paddingLeft: theme.spacing(10),
    [theme.breakpoints.only('md')]: {
      marginTop: theme.spacing(-2)
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(10)
    },
  },
  sampleDashboard: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto'
    // paddingLeft: theme.spacing(20)
  },

  leftSubHeaders: {
    color: '#58A1C1',
    paddingLeft: theme.spacing(10),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(5)
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0)
    },
  },
  leftPadding: {
    color: '#5F5F5F',
    paddingLeft: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(15)
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0)
    },
  },
  leftPaddingA: {
    paddingLeft: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(15)
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0)
    },
  },
  one: {
    display: 'grid',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
    

  },
  two: {
    display: 'grid',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  three: {
    display: 'grid',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  four: {
    display: 'grid',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)

  },
  five: {
    display: 'grid',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)

  }



}));

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

const GetStarted = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  console.log(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>

        {/* Header */}
          <Grid className={classes.header} xs={12}>
            <RouterLink className={classes.link} style={{ textDecoration: 'none' }} to="/">
              <img src={projectLogo} alt='Eudaimonia Logo' className={classes.logo} />
              <Typography variant='h5' className={classes.projectEudaimonia}>
                Project
              </Typography>
              <Typography variant='h5' className={classes.projectEudaimonia}>
                Eudaimonia
              </Typography>
            </RouterLink>

            </Grid>


        {/* Tutorial Section */}
        <Grid container justify="space-between" className={classes.tutorial}>
          <Grid item xs={12}>
            <Typography variant='h2' color='primary' className={classes.centerTitle}>
              Getting Started
            </Typography>

            <Divider />

            <Grid container className={classes.one}>
              <Typography variant='h5' className={classes.leftSubHeaders}>
                1. Add Chrome Extension
              </Typography>
              <Typography className={classes.leftPadding}>
                Click the button below to head to the Google Web Store.
              </Typography>
              {/* Buttons */}
              {/* <a className={classes.leftPaddingA} style={{ textDecoration: 'none', }} href={'https://chrome.google.com/webstore/detail/eudaimonia/bppoigjdaealcnkilpogfpaffhfjmchj?hl=en'}>
                <Button variant='contained' color='primary' size='large' className={classes.extensionButton} style={{ textTransform: 'none' }}>
                  Install Chrome Extension
                </Button>
              </a> */}
              <div className={classes.leftPaddingA}>
              <Button variant='contained' color='primary' size='large' className={classes.extensionButton} href={'https://chrome.google.com/webstore/detail/eudaimonia/bppoigjdaealcnkilpogfpaffhfjmchj?hl=en'}>
                {/* <Link href={'https://chrome.google.com/webstore/detail/eudaimonia/bppoigjdaealcnkilpogfpaffhfjmchj?hl=en'}> */}
                Install Chrome Extension
                {/* </Link> */}
              </Button>
              </div>
              <Typography className={classes.leftPadding}>
                On the page for the Eudaimonia extension, click "Add to Chrome".
              </Typography>
              <img src={webStore} alt='Chrome Web Store' className={classes.webStoreImg} />
            </Grid>


            <Divider />


            <Grid container className={classes.two}>
              <Typography variant='h5' className={classes.leftSubHeaders}>
                2. Pin to Top
              </Typography>
              <Grid container xs={12} display='flex'>
                <Grid item md={6} xs={12}>
                  <Typography className={classes.leftPadding}>
                    In your Chrome window, click the Extensions button (puzzle icon). On the popup, click the Pin button next to the Eudaimonia extension. This will allow for easy access to the mood logger.
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <img src={pinToTop} alt='Pin To Top' className={classes.loginImg} />
                </Grid>
              </Grid>

            </Grid>


            <Divider />

            <Grid container className={classes.three}>
              <Typography variant='h5' className={classes.leftSubHeaders}>
                3. Login with your Google Account
              </Typography>
              <Grid container xs={12} display='flex'>
                <Grid item md={6} xs={12}>
                  <Typography className={classes.leftPadding}>
                    Sign in with your Google account.
                  </Typography><br />
                  <Typography className={classes.leftPadding}>
                    Note: you must use the same account to access the dashboard.
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <img src={signIn} alt='Sign in with your Google account' className={classes.loginImg} />
                  
                </Grid>

              </Grid>
            </Grid>


            <Divider />


            <Grid container xs={12} className={classes.four}>
              <Typography variant='h5' className={classes.leftSubHeaders}>
                4. Log a mood
              </Typography>

              <Grid container xs={12} display='flex'>
                <Grid item md={6} xs={12}>
                  <Typography className={classes.leftPadding}>
                    Choose the mood that most accurately reflects how you feel right now. You may open the extension to log more if necessary.
                  </Typography><br/>
                  <Typography className={classes.leftPadding}>
                    Note: there will be a red notification bubble on the extension icon when our algorithm determines the optimal time for you to log a mood.
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <img src={moodLogger} alt='Log a mood' className={classes.moodLoggerImg} />
                </Grid>

              </Grid>


            </Grid>


            <Divider />


            <Grid container className={classes.five}>
              <Typography variant='h5' className={classes.leftSubHeaders}>
                5. View Your Data
              </Typography>
              <Typography className={classes.leftPadding}>
                Click the "Dashboard" button from the extension or go to projecteudaimonia.net. Login with the same Google account and view all your web/mood data.
              </Typography><br />
              <img src={dashboard} alt='Dashboard snippet' className={classes.sampleDashboard} />
            </Grid>
            




          </Grid>

        </Grid>
        <Grid className={classes.homeButton}>
          <RouterLink className={classes.bottomLink} style={{ textDecoration: 'none' }} to="/">
            <img src={projectLogo} alt='Eudaimonia Logo' className={classes.logo} />
            <Typography variant='h5' className={classes.projectEudaimonia}>
              Project
            </Typography>
            <Typography variant='h5' className={classes.projectEudaimonia}>
              Eudaimonia
            </Typography>
            
          </RouterLink>
        </Grid>
        <Copyright />
        <br/><br/>
      </div>
    </ThemeProvider >
  )
}

export default GetStarted;