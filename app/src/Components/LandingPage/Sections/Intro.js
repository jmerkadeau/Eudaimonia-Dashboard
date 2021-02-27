import React from 'react';
import SignIn from './../SignIn.js';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Typography, Avatar, Grid } from '@material-ui/core';
import projectLogo from './../../../projectLogo.png';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import shadows from '@material-ui/core/styles/shadows';
import outlinedLogo from './outlinedLogo.png';

// Old theme here:
// const theme = createMuiTheme({
//     palette: {
//       primary: {
//         main: "#347aeb",
//         light: "#3d7feb",
//       }
//     }
// });
const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#4887ED",
        light: "#70A1F1",
      }
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundSize: 'cover',
        backgroundColor: '#4887ED'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(1),
    },
    headerText: {
        // marginLeft: theme.spacing(.5),
        // marginRight: theme.spacing(.5),
        marginLeft: theme.spacing(1.5)

    },
    logo: {
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // elevation: 2,
        width: 50,
        height: 50
    },
    google: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    left: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(6),
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#4887ED',
        width: '100%'
    },
    white: {
        color: 'white'
    },
    subtitle: {
        // padding: theme.spacing(3),
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(20),
        marginBottom: theme.spacing(5),
        color: 'white',
    },
    subtitle1: {
        marginTop: theme.spacing(6),
        color: 'white',
        marginRight: theme.spacing(35)

    }
  }));

const Intro = () => {
    const classes = useStyles();
    return(
        <ThemeProvider theme={theme}>
        <Grid item className={classes.header}>
            <img src={projectLogo} alt='Eudaimonia Logo' className={classes.logo} />

            {/* comment out below */}
            <Typography variant='h3' color='primary' className={classes.headerText}>
                Project
            </Typography>
            <Typography variant='h3' color='primary' className={classes.headerText}>
                Eudaimonia
            </Typography>


        </Grid>
        <Box className={classes.root} width='100%'>
            <Grid item xs={false} sm={4} md={7} className={classes.left}>
                {/* <img src={outlinedLogo} alt='Eudaimonia Logo' className={classes.logo} /> */}

                {/* <Avatar alt='Eudaimonia Logo' src={projectLogo} className={classes.logo} /> */}
                {/* <Avatar>
                    <img src={projectLogo} alt='Eudaimonia Logo' />
                </Avatar> */}

                {/* comment back in */}
                {/* <Typography variant='h2' className={classes.white}>
                    Project Eudaimonia
                </Typography> */}


                <Typography variant='h5' className={classes.subtitle1}>
                    eudaimonia
                </Typography>
                <Typography className={classes.subtitle}>
                    (n.) lit. "human flourishing"; a contented state of
                    being happy and healthy and prosperous
                </Typography>
                <div className={classes.google}>
                    <SignIn />
                </div>
            </Grid>
        </Box>
        </ThemeProvider>

    )
}
export default Intro;