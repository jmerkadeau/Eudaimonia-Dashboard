import React from 'react';
import SignIn from './../SignIn.js';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Typography, Avatar, Grid, Button } from '@material-ui/core';
import { Card, CardActions, CardContent } from '@material-ui/core';
import projectLogo from './../../../projectLogo.png';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import shadows from '@material-ui/core/styles/shadows';
import outlinedLogo from './outlinedLogo.png';
import GSI from './../../../GSI.png'
import theme from './Theme.js'
import CssBaseline from '@material-ui/core/CssBaseline';



// Old theme here:
// const theme = createMuiTheme({
//     palette: {
//       primary: {
//         main: "#347aeb",
//         light: "#3d7feb",
//       }
//     }
// });

// new color scheme
// const theme = createMuiTheme({
//     palette: {
//         primary: {
//             main: "#58A1C1",
//             light: "#7BB5CE",
//         },
//       secondary: {
//           main: '#FFFFFF'
//       }
//     },
//     // overrides: {
//     //     MuiCssBaseline: {
//     //         '@global': {
//     //             '@font-face': []
//     //         }
//     //     }
//     // }
// });

const useStyles = makeStyles((theme) => ({
    root: {
    },
    banner: {
        marginTop: theme.spacing(1),
        backgroundColor: '#58A1C1',
        flexGrow: 1,
        justifyContent: 'center',
        // textAlign: 'center',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(1)
    },
    headerText: {
        // marginLeft: theme.spacing(.5),
        // marginRight: theme.spacing(.5),
        marginLeft: theme.spacing(1.5)

    },
    title: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
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
        backgroundColor: '#58A1C1',
        width: '100%',
        justifyContent: 'center'
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
        display: 'flex',
        marginBottom: theme.spacing(3)       
    },
    button: {
        textAlign: 'center',
        display: 'grid',
        justifyContent: 'center'

    },
    extensionButton: {
        backgroundColor: 'white',
        color: '#616161',
        '&:hover': {
            backgroundColor: 'white',
        },
        fontSize: 14,


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
    },
    pos: {
        marginBottom: 12,
      },
    cardRoot: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(5)

    },
    definitionCard: {
    }
  }));

const Intro = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>

        {/* Header */}
        <Grid item className={classes.header} xs={12}>
            <img src={projectLogo} alt='Eudaimonia Logo' className={classes.logo} />

            <Typography variant='h3' color='primary' className={classes.headerText}>
                Project
            </Typography>
            <Typography variant='h3' color='primary' className={classes.headerText}>
                Eudaimonia
            </Typography>
        </Grid>


        {/* Banner */}
        {/* <Grid className={classes.root2} width='100%' xs={12}>
            <Grid item xs={false} sm={4} md={7} className={classes.left}> */}
        <Grid container className={classes.banner}>

            <Grid container spacing={3} className={classes.title}>
                <Grid item xs={12}>
                    <Typography variant='h4' className={classes.white}>
                        Data-Driven Solution For Healthy Web Habits
                    </Typography>
                </Grid>
            </Grid>


            {/* Dictionary Card */}
            <Grid container spacing={3}>
                <Grid item xs>
                </Grid>
                <Grid item xs={4} className={classes.cardRoot}>
                    <Card raised='true' className={classes.definitionCard}>
                        <CardContent>
                            <Typography variant="h5" component="h2" color='primary'>
                                eu{bull}dai{bull}mo{bull}ni{bull}a
                            </Typography>
                            <Typography className={classes.pos} color='primary.light' >
                                noun
                            </Typography>
                            <Typography variant="body2" component="p">
                                human flourishing;
                                <br />
                                a contented state of being happy, healthy, and prosperous
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                </Grid>

            </Grid>

                


            {/* Buttons */}
            <Grid container spacing={3} className={classes.buttons}>
                <Grid item xs></Grid>

                <Grid item xs={3} className={classes.button}>
                    <Typography className={classes.whiteText}>
                            New User
                    </Typography>



                    <a style={{ textDecoration: 'none',}} href={'https://chrome.google.com/webstore/detail/eudaimonia/bppoigjdaealcnkilpogfpaffhfjmchj?hl=en'}>
                    <Button variant='contained' size='large' className={classes.extensionButton} style={{textTransform: 'none'}}>
                        Install Chrome Extension
                    </Button>
                    </a>
                </Grid>



                <Grid item xs={3} className={classes.button}>
                    <Typography className={classes.whiteText}>
                            Returning User
                    </Typography>

                    <SignIn />
                </Grid>
                <Grid item xs></Grid>


            </Grid>
        </Grid>
        </div>
        </ThemeProvider>

    )
}
export default Intro;