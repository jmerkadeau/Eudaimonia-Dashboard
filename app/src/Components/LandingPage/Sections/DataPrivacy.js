import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Icon } from "@material-ui/core";
import clsx from "clsx";
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
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
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(15)

    },
  wrapper: {
    position: "relative",
    "&::after": {
      content: '" "',
      display: "block",
      position: "absolute",
      height: "100%",
      width: "100vw",
      top: 0,
      left: "calc(-100vw + 50% - 300px)",
      background: '#347aeb',
      opacity: 0.1,
      borderTopRightRadius: 300,
      borderBottomRightRadius: 300,
      zIndex: -1,
    },
    "&::before": {
      content: '" "',
      display: "block",
      position: "absolute",
      height: "100%",
      width: "100vw",
      top: 0,
      right: "calc(-100vw + 50% - 300px)",
      background: '#347aeb',
      opacity: 0.1,
      borderTopLeftRadius: 300,
      borderBottomLeftRadius: 300,
      zIndex: -1,
    },
  },
    rootGrid: {
        display: 'flex'
    },
    header: {
        textAlign: 'center',
    },
    body: {
        textAlign: 'center',
        paddingLeft: theme.spacing(60),
        paddingRight: theme.spacing(60),
        marginTop: theme.spacing(2)
    },
    button: {
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    
    }
}));

const DataPrivacy = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <section className={classes.root}>
      <div className="container">
        {/* <Grid container className={classes.rootGrid}> */}
            <div className={clsx("text-center mx-auto", classes.wrapper)}>
            {/* <h1 className="mt-0 mb-7 font-normal text-44">Data Privacy</h1> */}
            <Typography variant='h4' color='primary' className={classes.header}>
                Data Privacy
            </Typography>
            <Typography className={classes.body}> 
                We have developed a secure cloud platform to ensure your data stays
                private and protected.
            </Typography>
            <Typography className={classes.body}> 
                View our full privacy policy here:
            </Typography>
            {/* <p className="max-w-400 mx-auto mb-8">
                We have developed a secure cloud platform to ensure your data stays
                private and protected.
            </p>
            <p className="max-w-400 mx-auto mb-8">
                View our full privacy policy here:
            </p> */}
            <Grid container className={classes.button}>
                <RouterLink style={{ textDecoration: 'none'}} to="/privacy">
                    <Fab className="mr-6 px-6" variant="extended" color="primary">
                    Privacy Policy
                    </Fab>
                </RouterLink>
            </Grid>
            </div>
        {/* </Grid> */}
      </div>
    </section>
    </ThemeProvider>
  );
};

export default DataPrivacy;
