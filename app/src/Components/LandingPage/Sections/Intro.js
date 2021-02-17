import React from 'react';
import SignIn from './../SignIn.js';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Typography, Avatar, Grid } from '@material-ui/core';
import projectLogo from './../../../projectLogo.png';
import { ThemeProvider } from 'react-bootstrap';
import shadows from '@material-ui/core/styles/shadows';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundSize: 'cover',
        backgroundColor: '#347aeb'


    },
    logo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        elevation: 2,
        width: 60,

    },
    google: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    left: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(5),
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#347aeb',
        width: '100%'
    },
    white: {
        color: 'white'
    },
    subtitle: {
         padding: theme.spacing(3),
        marginLeft: theme.spacing(12),
        marginRight: theme.spacing(12),
        color: 'white',
    }
  }));

const Intro = () => {
    const classes = useStyles();
    return(
        <Box className={classes.root} width='100%'>
            <Grid item xs={false} sm={4} md={7} className={classes.left}>
                <img src={projectLogo} alt='Eudaimonia Logo' className={classes.logo} />

                {/* <Avatar alt='Eudaimonia Logo' src={projectLogo} className={classes.logo} /> */}
                {/* <Avatar>
                    <img src={projectLogo} alt='Eudaimonia Logo' />
                </Avatar> */}
                <Typography variant='h2' className={classes.white}>
                    Project Eudaimonia
                </Typography>
                <Typography className={classes.subtitle}>
                    You are what you consume. That’s especially true 
                    when it comes to web usage and its effects on our mental health.
                    Take action today.
                </Typography>
                <div className={classes.google}>
                    <SignIn />
                </div>
            </Grid>



        </Box>
    )
}
export default Intro;