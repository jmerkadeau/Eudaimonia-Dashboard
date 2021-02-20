import React from "react";
import { Grid, Typography } from "@material-ui/core";
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AlarmIcon from '@material-ui/icons/Alarm';
import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#347aeb",
        light: "#3d7feb"
      }
    }
});

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(8),
    },
    header: {
        fontWeight: '600',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: theme.spacing(6)

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
    iconSizing: {
        width: 80,
    },
    grid1: {
        display: 'flex',
        textAlign: 'center',
    },
    grid0: {
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    miniTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontWeight: '600',
    }
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
        text: "With our modern and simple dashboard, it's easy to visualize the relationship between your web usage and your mood.",
      },
      {
        title: "Analyze",
        icon: EmojiObjectsIcon,
        text: "Using statistical and machine-learning techniques, our platform helps you understand the effect web usage has on your mood.",
      },
    ];

    const classes = useStyles();
    return (
      <ThemeProvider theme={theme}>
        
        <section className={classes.root} id="services8">
            <div className="container">
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                {/* <Grid item className={classes.grid1}>
                    <Typography variant='h6' className={classes.header}>
                        Our platform will help you gain a better understanding of how the internet affects your mental health.
                    </Typography>
                </Grid> */}
                <Grid item className={classes.grid2}>
                    {serviceList.map((item, ind) => (
                        <Grid key={ind} item sm={4} xs={12} className={classes.center}>
                        <div className="text-center max-w-252 mx-auto">
                        <item.icon color="primary" style={{ fontSize: 50 }} />
                        <Typography variant='h5' color='primary' className={classes.miniTitle}>{item.title}</Typography>
                        <Typography> 
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