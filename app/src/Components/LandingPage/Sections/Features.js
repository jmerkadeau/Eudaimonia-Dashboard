import React from "react";
import { Grid, Typography } from "@material-ui/core";
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AlarmIcon from '@material-ui/icons/Alarm';
import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './Theme.js';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#58A1C1",
//       light: "#7BB5CE",
//     },
//   }
// });

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: theme.spacing(5),
        // backgroundColor: theme.palette.grey.A200
    },
    grid2: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    center: {
        textAlign: 'center',
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
    },
    subTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontWeight: '600',
        color: theme.palette.grey.A600
    },
    header: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.main
    },
    text: {
      color: theme.palette.grey.A700
    },
  }));
const Features = () => {
    const serviceList = [
      {
        title: "Track",
        icon: WatchLaterIcon,
        text: "Timed notifications from our extension help remind you to log your mood throughout the day to track your mental health.",
      },
      {
        title: "Visualize",
        icon: PieChartIcon,
        text: "With our intuitive dashboard, it's easy to visualize the relationship between your web usage and your mood.",
      },
      {
        title: "Analyze",
        icon: EmojiObjectsIcon,
        text: "Statistical and machine-learning techniques help you understand and improve your web activity patterns.",
      },
    ];

    const classes = useStyles();
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
        
        <section className={classes.root} id="services8">
            <div className="container">
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                {/* <Grid item className={classes.grid1}>
                    <Typography variant='h6' className={classes.header}>
                        Our platform will help you gain a better understanding of how the internet affects your mental health.
                    </Typography>
                </Grid> */}
                <Typography variant='h2' className={classes.header}>
                  How It Works
                </Typography>
                <Grid item className={classes.grid2}>
                    {serviceList.map((item, ind) => (
                        <Grid key={ind} item sm={4} xs={12} className={classes.center}>
                        <div className="text-center max-w-252 mx-auto">
                        <item.icon color='primary' style={{ fontSize: 50 }} />
                        <Typography variant='h5' className={classes.subTitle}>{item.title}</Typography>
                        <Typography className={classes.text}> 
                            {item.text}
                        </Typography>
                        </div>
                        </Grid>
                    ))}
                </Grid>
                </Grid>
            </div>
        </section>
      </ThemeProvider>
    );
  };
  
  export default Features;