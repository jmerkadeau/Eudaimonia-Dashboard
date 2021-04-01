import React from 'react';
import SignIn from './../SignIn.js';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Typography, Avatar, Grid, Button } from '@material-ui/core';
import { Card, CardActions, CardContent } from '@material-ui/core';
import projectLogo from './../../../img/logos/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from './Theme.js';
import CssBaseline from '@material-ui/core/CssBaseline';


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

  // Banner Style
  banner: {
    marginTop: theme.spacing(1),
    backgroundColor: '#58A1C1',
    flexGrow: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  },
  title: {
    color: theme.palette.common.white,
  },



  // Card Style
  pos: {
    marginBottom: 12,
    color: theme.palette.grey.A500
  },
  cardRoot: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(5)
  },
  definition: {
    color: theme.palette.grey.A700
  },




  // Buttons Style
  buttons: {
    display: 'flex',

    marginBottom: theme.spacing(3)
  },
  button: {
    textAlign: 'center',
    display: 'grid',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  extensionButton: {
    backgroundColor: 'white',
    color: '#616161',
    '&:hover': {
      backgroundColor: 'white',
    },
    fontSize: 14,
    // color: theme.palette.grey.A600,
    borderRadius: 1,
    height: '100%',
    width: '100%',
    // marginTop: theme.spacing(-1.2),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },


  },
  whiteText: {
    color: '#FFFFFF'
  },
  whiteText2: {
    color: '#FFFFFF',
    marginBottom: theme.spacing(1.2)

  },
  googleButton: {
    // paddingTop: theme.spacing(1)

  }



}));

const Intro = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>

        {/* Header */}
        <Grid item className={classes.header} xs={12}>

          <img src={projectLogo} alt='Eudaimonia Logo' className={classes.logo} />

          <Typography variant='h5' className={classes.projectEudaimonia}>
            Project
            </Typography>
          <Typography variant='h5' className={classes.projectEudaimonia}>
            Eudaimonia
            </Typography>

        </Grid>


        {/* Banner */}

        <Grid container className={classes.banner}>

          <Grid container spacing={3} className={classes.bannerTitle}>
            <Grid item xs={12}>
              <Typography variant='h5' className={classes.title}>
                Data-Driven Solution For Healthy Web Habits
                    </Typography>
            </Grid>
          </Grid>


          {/* Dictionary Card */}
          <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item lg={4} md={4} sm={6} xs={8} className={classes.cardRoot}>
              <Card raised='true' className={classes.definitionCard}>
                <CardContent>
                  <Typography variant="h5" component="h2" color='primary'>
                    eu{bull}dai{bull}mo{bull}ni{bull}a
                            </Typography>
                  <Typography className={classes.pos} >
                    noun
                            </Typography>
                  <Typography variant="body2" component="p" className={classes.definition}>
                    human flourishing;
                                <br />
                                a contented state of being happy, healthy, and prosperous
                            </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs></Grid>
          </Grid>

          {/* Buttons */}
          <Grid container spacing={3} className={classes.buttons}>
            <Grid item xs></Grid>


            <Grid item lg={3} md={4} sm={12} xs={12} className={classes.button}>
              <Typography className={classes.whiteText}>
                New User
              </Typography>



              {/* <a style={{ textDecoration: 'none', }} href={'https://chrome.google.com/webstore/detail/eudaimonia/bppoigjdaealcnkilpogfpaffhfjmchj?hl=en'}>
                <Button variant='contained' size='large' className={classes.extensionButton} style={{ textTransform: 'none' }}>
                  Install Chrome Extension
                    </Button>
              </a> */}
              <RouterLink style={{ textDecoration: 'none' }} to="/tutorial">
                <Button variant='contained' size='large' className={classes.extensionButton} style={{ textTransform: 'none' }}>
                  Get Started
                    </Button>
              </RouterLink>

            </Grid>


            <Grid item lg={3} md={4} sm={12} xs={12} className={classes.button}>
              <Typography className={classes.whiteText2}>
                Returning User
                    </Typography>

              <div className={classes.googleButton}>
                <SignIn />
              </div>
            </Grid>
            <Grid item xs></Grid>


          </Grid>
        </Grid>
      </div>
    </ThemeProvider>

  )
}
export default Intro;