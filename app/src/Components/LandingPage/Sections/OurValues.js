import React from "react";
import { Grid, Icon, Button, useMediaQuery, Container, Typography, ThemeProvider, createMuiTheme, makeStyles, Fab } from "@material-ui/core";
import moodLogger from "./../../../img/moodLogger.png";

import { Link as RouterLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './Theme.js';


// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#58A1C1",
//       light: "#7BB5CE",
//     },
//     gray: {
//       main: '#98AFBA',
//       dark: '#354A54'
//   }
//   },
//   typography: {
//     fontFamily: {

//     }
//   }
// });

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
    backgroundColor: theme.palette.grey.A100
  },
  leftText: {
    marginLeft: theme.spacing(20),
    paddingRight: theme.spacing(5),
    color: theme.palette.grey.A700
  },
  leftSubHeaders: {
    marginLeft: theme.spacing(20),
    color: theme.palette.primary.dark
  },
  photo: {
    marginTop: theme.spacing(10),
    marginRight: theme.spacing(10),
    width: '60%'
  },
  title: {
    textAlign: 'center',
    marginLeft: theme.spacing(15)
  },
  leftSide: {


  },
  privacyButton: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(3),
  },
  privacyFab: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  },
}))

const OurValues = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <section className={classes.root}>
        <div className="container">
          <Grid container spacing={isMobile ? 4 : 10} justify="space-between">
            <Grid item sm={8} xs={12} className={classes.leftSide}>
              <Typography variant='h2' color='primary' className={classes.title}>
                Our Values
                </Typography><br />
              <Typography variant='h5' className={classes.leftSubHeaders}>
                Ease of use
                </Typography>
              <Typography className={classes.leftText}>
                Simple is always better. Through our minimalist design and carefully
                curated feature set, we strive to make it as easy as possible
                to use our tools.
                </Typography><br />
              <Typography variant='h5' className={classes.leftSubHeaders}>
                Empowerment
                </Typography>
              <Typography className={classes.leftText}>
                Our goal isn’t to force change, but rather to empower you to find your
                own path to wellness and happiness.
                </Typography><br />
              <Typography variant='h5' className={classes.leftSubHeaders}>
                Integrity
                </Typography>
              <Typography className={classes.leftText}>
                We operate with full transparency and are accountable by measuring our actions
                against the highest standards of integrity and responsibility to the community.
                </Typography><br />
              <Typography className={classes.leftText}>
                Moreover, it is fundamental to our values to protect user data and privacy.
                View our full privacy policy here:
                </Typography>
              <div className={classes.privacyButton}>
                <RouterLink style={{ textDecoration: 'none' }} to="/privacy">
                  <Fab className={classes.privacyFab} variant="extended">
                    Privacy Policy
                    </Fab>
                </RouterLink>
              </div>
            </Grid>
            <Grid item sm={4} xs={12}>
              <img
                src={moodLogger}
                alt="graduate"
                className={classes.photo}
              />
            </Grid>
          </Grid>
        </div>
      </section>
    </ThemeProvider>

  )
}

export default OurValues;