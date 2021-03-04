import React from "react";
import { Grid, Icon, Button, useMediaQuery, createMuiTheme, ThemeProvider, Typography, Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import defaultProfile from './defaultProfile.png';
import joseph from './josephpic.png';
import stanley from './stanleypic.png';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './Theme.js';



// const theme = createMuiTheme({
//     palette: {
//         primary: {
//             main: "#58A1C1",
//             light: "#7BB5CE",
//         },
//         gray: {
//             main: '#98AFBA',
//             dark: '#354A54'
//         }
//     }
// });
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        // backgroundColor: 'rgba(52, 122, 235, .2)',
        // backgroundColor: 'rgba(72, 135, 237, 0.2)',
        backgroundColor: '#58A1C1',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(5),
    },
    header: {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        margin: theme.spacing(5),
        fontWeight: '500',
        // color: '#4887ED',
        color: '#D3D3D3',

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
        textAlign: 'center',
        color: 'white',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
        // marginLeft: theme.spacing(20),
        // marginRight: theme.spacing(20)
    },
    signature: {
        textAlign: 'right',
        marginRight: theme.spacing(5),
        fontSize: '20px'
    },
    bodyText: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        // marginLeft: theme.spacing(4),
        // marginRight: theme.spacing(4)
    },
    names: {
        color: '#D3D3D3'
    }
  
}));

const AboutUs = () => {
    const classes = useStyles();
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
        <Grid container>
            <Grid container spacing={3} className={classes.header}>
                <Typography variant='h2' className={classes.title}>Our Story</Typography>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={4} className={classes.frame}>
                    <img
                        src={stanley}
                        alt="profile1"
                        className={classes.pic}
                    />
                    <Typography className={classes.names}>Stanley Jia</Typography>
                </Grid>
                <Grid item xs={4} className={classes.frame}>
                    <img
                        src={joseph}
                        alt="profile2"
                        className={classes.pic}
                    />
                    <Typography className={classes.names}>Joseph Merkadeau</Typography>
                </Grid>
                <Grid item xs></Grid>


            </Grid>

            <Grid container spacing={3} className={classes.description}>
                <Grid item xs></Grid>
                <Grid item xs={4}>
                    <Typography className={classes.bodyText}>
                        With the pandemic and stay-at-home orders, we found ourselves online more than ever. 
                        At the same time, we both felt increasinly anxious and isolated. Sharing this experience, 
                        we realized that our online activities significantly impacted our thoughts and our emotions. 
                        Unfortunately, the effects are often negative.
                    </Typography>

                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.bodyText}>

                    To help ourselves tackle this problem, we started developing Project 
                    Eudaimonia. After months of work, our solution is getting to the point where we 
                    can share it with our friends and community. We hope you all find it as helpful
                    as we have for better understanding the effects of web usage on mental health.

                    </Typography>
                    
                </Grid>
                <Grid item xs></Grid>
            </Grid>
            
{/* 
            <Grid item sm={6} xs={12} className={classes.description}>
                <Typography>
                    With the pandemic and stay-at-home orders, we found ourselves online more than ever. 
                    At the same time, we both felt increasinly anxious and isolated. Sharing this experience, 
                    we realized that our online activities significantly impacted our thoughts and our emotions. 
                    Unfortunately, the effects are often negative.
                </Typography><br/><br/>
                <Typography>

                To help ourselves tackle this problem, we started developing Project 
                Eudaimonia. After months of work, our solution is getting to the point where we 
                can share it with our friends and community. We hope you all find it as helpful
                as we have for better understanding the effects of web usage on mental health.

                </Typography>
            </Grid> */}

        </Grid>
        </div>
    </ThemeProvider>
    );
};

export default AboutUs;
