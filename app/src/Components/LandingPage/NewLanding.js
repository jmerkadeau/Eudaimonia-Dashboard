import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, CardActions, AppBar, Toolbar, useScrollTrigger, Slide } from '@material-ui/core';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import GSI from '../../GSI.png';
import { auth, database, provider } from '../../Data/Firebase.js';
import projectLogo from './../../projectLogo.png';
import TopBar from './TopBar.js';
import HideAppBar from './TopBar2.js';
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from './SignIn.js'
import Intro from './Sections/Intro.js';
import Services from './Sections/OurServices.js';


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
  return(
    <div className={classes.root}>
      <Intro />
      <Services />

    </div>

  )


  // return (
  //   <React.Fragment>
  //     {/* <Router>
  //     <Switch>
  //       <Route path='/' exact component={() => <NewLanding />} />
  //       <Route path='/mood' exact component={() => <Mood webLog={this.state.webLog} moodLog={this.state.moodLog} />} />
  //     </Switch>
  //   </Router> */}
  //   <Grid container component="main" className={classes.root}>
  //       <CssBaseline />
  //       <Grid item xs={false} sm={4} md={7} className={classes.left}>
  //           <Avatar alt='Eudaimonia Logo' src={projectLogo} className={classes.logo} />
  //           <Typography variant='h2' color='primary' >
  //               Project Eudaimonia
  //           </Typography>
  //           <Grid className={classes.bottomGrid}>
  //           <RouterLink to="/privacy">
  //                 Privacy Policy
  //           </RouterLink>
  //           </Grid>

  //       </Grid>
  //       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
  //           <div className={classes.paper}>
  //           <Card className={classes.card}>
  //               <CardContent className={classes.content}>
  //                   <Avatar className={classes.avatar}>
  //                       <LockOutlinedIcon />
  //                   </Avatar>
  //                   <Typography component="h1" variant="h5">
  //                       Sign in
  //                   </Typography>
  //               </CardContent>
  //               <CardActions className={classes.cardActions}>
  //                 <SignIn />
  //                   {/* <img src={GSI} onClick={googleSignIn} id="googleButton" alt="Sign in with Google" /> */}
  //               </CardActions>
  //           </Card>
  //           </div>
  //           <Copyright/>
  //       </Grid>
  //   </Grid>
  //   </React.Fragment>
  // );
}