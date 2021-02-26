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
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(5)
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
        marginRight: theme.spacing(40),
        marginLeft: theme.spacing(40),
        // display: 'flex',
        // marginRight: 'auto',
        // marginLeft: 'auto',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(10),
        textAlign: 'center',
        color: 'white'
    },
    signature: {
        textAlign: 'right',
        marginRight: theme.spacing(5),
        fontSize: '20px'
    }
  
}));

const AboutUs = () => {
    const classes = useStyles();
    return (
    <ThemeProvider theme={theme}>
        <section className={classes.root}>
        <Container>
            <Typography variant='h2' className={classes.title}>Our Story</Typography>
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
                With the pandemic and stay-at-home orders, I found myself online more than ever. 
                At the same time, my mood started fluctuating more throughout the day. I found 
                myself feeling increasingly anxious and isolated. Some days, I would feel intense 
                FOMO (fear of missing out). Sharing this experience with Joseph, we realized that 
                our online activities significantly impacted our thoughts and how we feel afterwards. 
                Unfortunately, the effects are often negative. 
                </Typography><br/><br/>
                <Typography>
                To help ourselves tackle this problem, Joseph and I started developing Project 
                Eudaimonia. After months of work, our solution is getting to the point where we 
                can share it with our friends and community. Hopefully, you’ll find it as useful 
                as we have for better understanding the effects of web usage on mental health.
                </Typography>
                <Typography variant='body1' className={classes.signature}>
                    - Stanley
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
