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