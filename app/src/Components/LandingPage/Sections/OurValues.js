import React from "react";
import { Grid, Icon, Button, useMediaQuery, Container, Typography, ThemeProvider, createMuiTheme, makeStyles, Fab } from "@material-ui/core";
import stockTyping from './../../../stockTyping.jpg';
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
      marginTop: theme.spacing(15),
      marginRight: theme.spacing(15),
      width: '80%'
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


    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <section className={classes.root}>
        <div className="container">
          <Grid container spacing={isMobile ? 4 : 10} justify="space-between">
            <Grid item sm={6} xs={12} className={classes.leftSide}>
                <Typography variant='h2' color='primary' className={classes.title}>
                    Our Values
                </Typography><br/>
                <Typography variant='h5' className={classes.leftSubHeaders}>
                  Ease of use
                </Typography>
                <Typography className={classes.leftText}>
                    Simple is always better. Through our minimalist design and carefully 
                    curated feature set, we strive to make it as easy as possible 
                    to use our tools.
                </Typography><br/>
                <Typography variant='h5' className={classes.leftSubHeaders}>
                  Empowerment
                </Typography>
                <Typography className={classes.leftText}>
                Our goal isn’t to force change, but rather to empower you to find your 
                own path to wellness and happiness.
                </Typography><br/>
                <Typography variant='h5' className={classes.leftSubHeaders}>
                  Integrity
                </Typography>
                <Typography className={classes.leftText}>
                    We operate with full transparency and are accountable by measuring our actions 
                    against the highest standards of integrity and responsibility to the community.
                </Typography><br/>
                <Typography className={classes.leftText}>
                    Moreover, it is fundamental to our values to protect user data and privacy. 
                    View our full privacy policy here:
                </Typography>
                <div className={classes.privacyButton}>
                <RouterLink style={{ textDecoration: 'none'}} to="/privacy">
                    <Fab className={classes.privacyFab} variant="extended">
                    Privacy Policy
                    </Fab>
                </RouterLink>
                </div>
            </Grid>
            <Grid item sm={6} xs={12}>
            <img
                src={stockTyping}
                alt="graduate"
                className={classes.photo}
                // className="max-h-500 max-w-full border-radius-12"
              />
              {/* <h1 className="mt-0 text-48 font-normal mb-8 inline-block">
                Our Services
              </h1>
              <p className="my-8 max-w-400">
              Project Eudaimonia is our solution. With data privacy in mind, 
              we’ve developed a secure cloud platform to help users better 
              understand how the internet affects their mental health. We combine 
              the functionality of productivity trackers like RescueTime with a 
              simple and clean user interface for mood logging. 
  
              </p> */}
            </Grid>
          </Grid>
        </div>
      </section>
      </ThemeProvider>
        
        // <section className='section'>
        //     <div className='container'>
        //     <Grid container>
        //     <Grid>
        //         <img src={stockTyping} alt="Typing"/>
        //     </Grid>
        //     <Grid>
                // <Typography variant='h2' color='primary'>
                //     Our Services
                // </Typography>
                // <Typography>
                //     Project Eudaimonia is our solution. With data privacy in mind, 
                //     we’ve developed a secure cloud platform to help users better 
                //     understand how the internet affects their mental health. We combine 
                //     the functionality of productivity trackers like RescueTime with a 
                //     simple and clean user interface for mood logging. 
                // </Typography>
        //     </Grid>
        //     </Grid>
        //     </div>
        // </section>
    )
}

export default OurValues;