import React from 'react';
import SignIn from './../SignIn.js';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Typography, Avatar, Grid, Button } from '@material-ui/core';
import projectLogo from './../../../projectLogo.png';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import shadows from '@material-ui/core/styles/shadows';
import outlinedLogo from './outlinedLogo.png';
import GSI from './../../../GSI.png'


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
      },
      secondary: {
          main: '#FFFFFF'
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
        // marginLeft: 'auto',
        // marginRight: 'auto',

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

    },
    buttons: {
        
    },
    extensionButton: {
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(1.5)
    },
    googleButton: {
        marginLeft: theme.spacing(10)

    },
    userSection: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: theme.spacing(5)
    },
    whiteText: {
        color: '#FFFFFF'
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
                <Typography variant='h4' className={classes.white}>
                    Data-driven solution for healthy web habits
                </Typography>


                <Typography variant='h5' className={classes.subtitle1}>
                    eudaimonia
                </Typography>
                <Typography className={classes.subtitle}>
                    (n.) lit. "human flourishing"; a contented state of
                    being happy and healthy and prosperous
                </Typography>
                <Container className={classes.userSection}>

                <Grid item className={classes.buttons}>
                    <Typography className={classes.whiteText}>
                            New User
                    </Typography>



                    <a style={{ textDecoration: 'none',}} href={'https://chrome.google.com/webstore/detail/eudaimonia/bppoigjdaealcnkilpogfpaffhfjmchj?hl=en'}>
                    <Button variant='contained' size='large' color='secondary' className={classes.extensionButton} style={{textTransform: 'none', maxWidth: '95%', maxHeight: '54%', minWidth: '95%', minHeight: '54%', fontSize: 'large'}}>
                        Install Chrome Extension
                    </Button>
                    </a>
                </Grid>



                <Grid item className={classes.buttons}>
                    <Typography className={classes.whiteText}>
                            Returning User
                    </Typography>
                    {/* <Typography>
                        or
                    </Typography> */}

                    {/* <Container item>
                    <Button variant='text' color='primary' onClick={SignIn} className={classes.googleButton} startIcon={<img src={GSI} style={{maxWidth: '75%', maxHeight: '75%', minWidth: '75%', minHeight: '75%'}}></img>}>
                    </Button>
                    </Container> */}
                    <SignIn />

                    {/* <SignIn /> */}
                    {/* <div className={classes.google}>
                        <SignIn />
                    </div> */}
                </Grid>
                </Container>

            </Grid>
        </Box>
        </ThemeProvider>

    )
}
export default Intro;