import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { auth, database, provider } from '../../Data/Firebase.js';

import Intro from './Sections/Intro.js';
import Services from './Sections/OurServices.js';
import Features from './Sections/Features.js';
import AboutUs from './Sections/AboutUs.js';
import OurValues from './Sections/OurValues.js';
import theme from './Sections/Theme.js';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';




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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    maxWidth: '100%',
    overflowX: 'hidden'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    minWidth: 275,
    textAlign: 'center',
    margin: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root2: {
    maxWidth: 400,
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
  },
  left: {
    padding: theme.spacing(5),
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  bottomGrid: {
    marginTop: theme.spacing(60),
  },

}));

const googleSignIn = () => {
  auth.signInWithPopup(provider).then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;

    console.log(token);
    console.log(user);

    database.ref('users/' + user.uid).set({
      uid: user.uid,
      name: user.displayName,
      email: user.email
    })
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}


export default function SignInSide() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className={classes.root}>
        <Intro />
        <Services />
        <OurValues />
        <Features />
        <AboutUs />
        {/* <DataPrivacy /> */}
        <Copyright />
        <br />
      </div>
    </ThemeProvider>

  )
}