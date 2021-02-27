import React from "react";
import { Grid, Icon, Button, useMediaQuery, createMuiTheme, ThemeProvider, Typography, Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import defaultProfile from './defaultProfile.png';


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
        display: 'flex',
        // backgroundColor: 'rgba(52, 122, 235, .2)',
        // backgroundColor: 'rgba(72, 135, 237, 0.2)',
        backgroundColor: 'rgba(72, 135, 237, 1)',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: theme.spacing(10)
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(5),
        fontWeight: '500',
        // color: '#4887ED',
        color: 'white',

    },
    profiles: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(5),
        color: 'white'
        
    },
    pic: {
        // display: 'block',
        width: '200px',
        height: '200px',
        marginBottom: theme.spacing(2),
        border: 'solid 2px white',
        // width: 'auto',
        // height: 'auto'
        
    },
    frame: {
        // margin: theme.spacing(3),
        textAlign: 'center'
    },
    description: {
        // display: 'flex',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(10),
        textAlign: 'center',
        color: 'white'
    }
  
}));

const AboutUs = () => {
    const classes = useStyles();
    return (
    <ThemeProvider theme={theme}>
        <section className={classes.root}>
        <Container>
            <Typography variant='h3' className={classes.title}>Our Story</Typography>
            <Grid item sm={6} xs={12} className={classes.profiles}>
                <Grid className={classes.frame}>
                <img
                src={defaultProfile}
                alt="profile1"
                className={classes.pic}
                />
                <Typography>Stanley Jia</Typography>
                </Grid>
                <Grid className={classes.frame}>
                <img
                src={defaultProfile}
                alt="profile2"
                className={classes.pic}
                />
                <Typography>Joseph Merkadeau</Typography>
                </Grid>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.description}>
                <Typography>
                With the pandemic and stay-at-home orders, we've found ourselves
                online more than ever. Studies have consistently shown that excessive 
                web consumption leads to increased feelings of anxiety, isolation, and 
                even depression. However, it’s not just the amount of time you spend 
                online, the type of content matters as well.
                </Typography><br/><br/>
                <Typography>
                We started working on Project Eudaimonia to help ourselves with this problem. 
                Now that we've developed it into a secure cloud platform, we want to help you 
                better understand how the internet affects your mental health.
                </Typography>
                {/* {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center">
                    <Icon className="mr-4" color="primary">
                    done
                    </Icon>
                    <p className="my-2">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    </p>
                </div>
                ))} */}
            </Grid>
        </Container>
        </section>
    </ThemeProvider>
    );
};

export default AboutUs;
