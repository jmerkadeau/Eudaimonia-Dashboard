import React from "react";
import { Grid, Icon, Button, useMediaQuery, Container, Typography, ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core";
import stockTyping from './../../../stockTyping.jpg';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#347aeb",
        light: "#3d7feb"
      }
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
    },
    rightText: {
        paddingRight: theme.spacing(10),
    }
}))

const Services = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const classes = useStyles();


    return(
        <ThemeProvider theme={theme}>
        <section className={classes.root}>
        <div className="container">
          <Grid container spacing={isMobile ? 4 : 10} justify="space-between">
            <Grid item sm={6} xs={12}>
              <img
                src={stockTyping}
                alt="graduate"
                className="max-h-500 max-w-full border-radius-12"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='h2' color='primary'>
                    Our Services
                </Typography><br/>
                <Typography className={classes.rightText}>
                    Project Eudaimonia is our solution. With data privacy in mind, 
                    we’ve developed a secure cloud platform to help users better 
                    understand how the internet affects their mental health. We combine 
                    the functionality of productivity trackers like RescueTime with a 
                    simple and clean user interface for mood logging. 
                </Typography><br/>
                <Typography className={classes.rightText}>
                Through our modern and clean dashboard, users can visualize their mood 
                and the patterns of web usage throughout the day. Using statistical and 
                machine-learning techniques, our platform helps users analyze and better 
                understand the effects that specific sites have on their mental health.
                </Typography>

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

export default Services;